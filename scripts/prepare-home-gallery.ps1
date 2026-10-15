$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$taskProjectRoot = Split-Path -Parent $PSScriptRoot
$taskOriginalDir = Join-Path $taskProjectRoot 'assets/originals/home-gallery'
$taskOutputDir = Join-Path $taskProjectRoot 'public/media/home-gallery'
New-Item -ItemType Directory -Path $taskOutputDir -Force | Out-Null

# The selected homepage mockup has a 686 x 440 px photo area.
# Crop at native resolution; integer rounding differs by less than one pixel.
$taskTargetRatio = 686.0 / 440.0
$taskJobs = @(
    @{ Name = '01-ards-poster'; Ext = '.jpg'; X = 60; Y = 35; Width = 1550; Height = 1193; AspectRatioException = $true; Reason = 'Replacement ARDS photo: trim outer margins at native resolution, keeping the complete poster content and the previously confirmed aspect-ratio exception.' },
    @{ Name = '02-ink-artwork'; Ext = '.png'; X = 0; Y = 98; Width = 1706; Height = 1094; Reason = 'Keep the complete framed artwork; remove surrounding wall.' },
    @{ Name = '03-robotics-team'; Ext = '.png'; X = 0; Y = 315; Width = 1280; Height = 821; Reason = 'Keep all three faces and the robot; remove ceiling and foreground.' },
    @{ Name = '04-orchestra'; Ext = '.jpg'; X = 140; Y = 0; Width = 1994; Height = 1279; Reason = 'Keep the central ensemble and the full vertical scene; trim side edges.' },
    @{ Name = '05-food'; Ext = '.jpg'; Preserve = $true; Reason = 'Additional subject-preservation exception: the fries and main dish exceed the target crop height.' },
    @{ Name = '06-snow-mountain'; Ext = '.jpg'; Preserve = $true; Reason = 'User confirmed keeping both the mountain summit and the visible person in full.' },
    @{ Name = '07-tennis'; Ext = '.jpg'; X = 0; Y = 130; Width = 1706; Height = 1094; Reason = 'Keep both visible players and the racket; trim empty court margins.' }
)

function Get-RegionPixelHash {
    param([System.Drawing.Bitmap]$Bitmap, [System.Drawing.Rectangle]$Region)

    $taskBitmapData = $Bitmap.LockBits(
        $Region,
        [System.Drawing.Imaging.ImageLockMode]::ReadOnly,
        [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
    )
    $taskHasher = [System.Security.Cryptography.SHA256]::Create()
    try {
        $taskRowLength = $Region.Width * 4
        $taskRow = [byte[]]::new($taskRowLength)
        for ($taskY = 0; $taskY -lt $Region.Height; $taskY++) {
            $taskRowAddress = [IntPtr]::Add($taskBitmapData.Scan0, $taskY * $taskBitmapData.Stride)
            [System.Runtime.InteropServices.Marshal]::Copy($taskRowAddress, $taskRow, 0, $taskRowLength)
            [void]$taskHasher.TransformBlock($taskRow, 0, $taskRowLength, $null, 0)
        }
        [void]$taskHasher.TransformFinalBlock([byte[]]::new(0), 0, 0)
        return [Convert]::ToHexString($taskHasher.Hash).ToLowerInvariant()
    }
    finally {
        $Bitmap.UnlockBits($taskBitmapData)
        $taskHasher.Dispose()
    }
}

$taskEntries = @()
foreach ($taskJob in $taskJobs) {
    $taskSourcePath = Join-Path $taskOriginalDir ($taskJob.Name + $taskJob.Ext)
    $taskSource = [System.Drawing.Bitmap]::new($taskSourcePath)
    try {
        $taskEntry = [ordered]@{
            upload_order = $taskEntries.Count + 1
            name = $taskJob.Name
            original = 'assets/originals/home-gallery/' + $taskJob.Name + $taskJob.Ext
            source_size = @{ width = $taskSource.Width; height = $taskSource.Height }
            resized = $false
            reason = $taskJob.Reason
        }

        if ($taskJob.Preserve) {
            $taskOutputName = $taskJob.Name + '-full' + $taskJob.Ext
            $taskOutputPath = Join-Path $taskOutputDir $taskOutputName
            if (Test-Path -LiteralPath $taskOutputPath) {
                if ((Get-FileHash -LiteralPath $taskSourcePath).Hash -ne (Get-FileHash -LiteralPath $taskOutputPath).Hash) {
                    throw "Existing output differs: $taskOutputPath"
                }
            }
            else {
                Copy-Item -LiteralPath $taskSourcePath -Destination $taskOutputPath
            }
            $taskEntry.mode = 'original-aspect-ratio-exception'
            $taskEntry.fit = 'contain'
            $taskEntry.crop = $null
            $taskEntry.output_size = $taskEntry.source_size
            $taskEntry.verification = @{ original_file_sha256_matches = ((Get-FileHash -LiteralPath $taskSourcePath).Hash -eq (Get-FileHash -LiteralPath $taskOutputPath).Hash) }
            if (-not $taskEntry.verification.original_file_sha256_matches) {
                throw "Original copy verification failed: $taskOutputPath"
            }
        }
        else {
            $taskRect = [System.Drawing.Rectangle]::new($taskJob.X, $taskJob.Y, $taskJob.Width, $taskJob.Height)
            if ($taskRect.X -lt 0 -or $taskRect.Y -lt 0 -or $taskRect.Right -gt $taskSource.Width -or $taskRect.Bottom -gt $taskSource.Height) {
                throw "Crop exceeds source image: $taskSourcePath"
            }
            if (-not $taskJob.AspectRatioException -and [Math]::Abs($taskRect.Width / $taskTargetRatio - $taskRect.Height) -gt 1) {
                throw "Crop does not match the homepage aspect ratio: $taskSourcePath"
            }
            $taskOutputName = $taskJob.Name + '-cropped.png'
            $taskOutputPath = Join-Path $taskOutputDir $taskOutputName
            if (-not (Test-Path -LiteralPath $taskOutputPath)) {
                # Bitmap.Clone copies an integer pixel rectangle without scaling.
                $taskCrop = $taskSource.Clone($taskRect, $taskSource.PixelFormat)
                try {
                    $taskCrop.Save($taskOutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
                }
                finally {
                    $taskCrop.Dispose()
                }
            }

            $taskResult = [System.Drawing.Bitmap]::new($taskOutputPath)
            try {
                if ($taskResult.Width -ne $taskRect.Width -or $taskResult.Height -ne $taskRect.Height) {
                    throw "Output dimensions do not match the crop: $taskOutputPath"
                }
                $taskExpectedPixelHash = Get-RegionPixelHash -Bitmap $taskSource -Region $taskRect
                $taskResultRect = [System.Drawing.Rectangle]::new(0, 0, $taskResult.Width, $taskResult.Height)
                $taskActualPixelHash = Get-RegionPixelHash -Bitmap $taskResult -Region $taskResultRect
                if ($taskExpectedPixelHash -ne $taskActualPixelHash) {
                    throw "Output pixels differ from the original crop: $taskOutputPath"
                }
                if ($taskJob.AspectRatioException) {
                    $taskEntry.mode = 'crop-only-aspect-ratio-exception'
                    $taskEntry.fit = 'contain'
                }
                else {
                    $taskEntry.mode = 'crop-only'
                    $taskEntry.fit = 'cover'
                }
                $taskEntry.crop = @{ x = $taskRect.X; y = $taskRect.Y; width = $taskRect.Width; height = $taskRect.Height }
                $taskEntry.output_size = @{ width = $taskResult.Width; height = $taskResult.Height }
                $taskEntry.verification = @{ all_crop_pixels_match = $true; pixel_sha256 = $taskActualPixelHash }
            }
            finally {
                $taskResult.Dispose()
            }
        }

        $taskEntry.file = '/media/home-gallery/' + $taskOutputName
        $taskEntries += [pscustomobject]$taskEntry
        [pscustomobject]@{ file = $taskOutputName; mode = $taskEntry.mode; width = $taskEntry.output_size.width; height = $taskEntry.output_size.height; verified = $true } | ConvertTo-Json -Compress
    }
    finally {
        $taskSource.Dispose()
    }
}

$taskPlaybackPath = Join-Path $taskOutputDir 'playback-order.json'
$taskPlaybackNames = @(Get-Content -LiteralPath $taskPlaybackPath -Raw | ConvertFrom-Json)
if ($taskPlaybackNames.Count -ne $taskEntries.Count -or @($taskPlaybackNames | Select-Object -Unique).Count -ne $taskEntries.Count) {
    throw 'Playback order must include every image exactly once.'
}
$taskPlaybackEntries = @()
foreach ($taskPlaybackName in $taskPlaybackNames) {
    $taskMatches = @($taskEntries | Where-Object { $_.name -eq $taskPlaybackName })
    if ($taskMatches.Count -ne 1) { throw "Unknown or duplicate playback image: $taskPlaybackName" }
    $taskPlaybackEntry = $taskMatches[0]
    $taskPlaybackEntry | Add-Member -MemberType NoteProperty -Name playback_order -Value ($taskPlaybackEntries.Count + 1) -Force
    $taskPlaybackEntries += $taskPlaybackEntry
}

$taskManifest = [ordered]@{
    prepared_on = '2026-10-14'
    ratio_reference = @{ file = 'docs/design/homepage-approved.png'; x = 657; y = 110; width = 686; height = 440 }
    target_aspect_ratio = $taskTargetRatio
    crop_tolerance = 'Less than one pixel due to integer crop dimensions.'
    playback_order_source = 'public/media/home-gallery/playback-order.json'
    order_note = 'Images are listed in playback order. Original upload_order is preserved. Food remains seventh after the six user-specified images.'
    images = $taskPlaybackEntries
}
$taskManifest | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath (Join-Path $taskOutputDir 'manifest.json') -Encoding utf8
