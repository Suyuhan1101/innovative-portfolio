param([string]$ProjectRoot = (Split-Path $PSScriptRoot -Parent))

Add-Type -AssemblyName System.Drawing
$pairs = @(
    @{ Name = 'home'; Reference = 'docs/design/homepage-approved.png'; Actual = 'docs/qa/home-desktop.jpg'; Height = 1138 },
    @{ Name = 'menu'; Reference = 'docs/design/menu-concept.png'; Actual = 'docs/qa/menu-desktop-home.jpg'; Height = 1058 }
)
foreach ($pair in $pairs) {
    $reference = [System.Drawing.Image]::FromFile((Join-Path $ProjectRoot $pair.Reference))
    $actual = [System.Drawing.Image]::FromFile((Join-Path $ProjectRoot $pair.Actual))
    $gap = 24
    $labelHeight = 48
    $canvas = [System.Drawing.Bitmap]::new($reference.Width + $gap + $actual.Width, $pair.Height + $labelHeight)
    $graphics = [System.Drawing.Graphics]::FromImage($canvas)
    $graphics.Clear([System.Drawing.Color]::White)
    $font = [System.Drawing.Font]::new('Arial', 16)
    $graphics.DrawString('APPROVED REFERENCE', $font, [System.Drawing.Brushes]::Black, 12, 10)
    $graphics.DrawString('IMPLEMENTED / NATIVE PIXELS / SCROLLBAR GUTTER 15px', $font, [System.Drawing.Brushes]::Black, $reference.Width + $gap + 12, 10)
    $graphics.DrawImageUnscaledAndClipped($reference, [System.Drawing.Rectangle]::new(0, $labelHeight, $reference.Width, $pair.Height))
    $graphics.DrawImageUnscaledAndClipped($actual, [System.Drawing.Rectangle]::new($reference.Width + $gap, $labelHeight, $actual.Width, $pair.Height))
    $canvas.Save((Join-Path $ProjectRoot ('docs/qa/' + $pair.Name + '-comparison.png')), [System.Drawing.Imaging.ImageFormat]::Png)
    $font.Dispose(); $graphics.Dispose(); $canvas.Dispose(); $reference.Dispose(); $actual.Dispose()
}
