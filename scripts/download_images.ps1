$dirs = @(
  'public/images/spares',
  'public/images/industries',
  'public/images/distributors',
  'public/images/factory'
)

foreach ($d in $dirs) {
  if (-not (Test-Path $d)) {
    New-Item -ItemType Directory -Force -Path $d | Out-Null
  }
}

$urls = @{
  'public/images/spares/v-belt.webp' = 'https://evomachinery.in/img/v-belt.webp'
  'public/images/spares/transmission-chain.webp' = 'https://evomachinery.in/img/transmission-chain.webp'
  'public/images/spares/conveyor-belts.webp' = 'https://evomachinery.in/img/conveyor-belts.webp'
  'public/images/spares/crusher-spares.webp' = 'https://evomachinery.in/img/crusher-spares.webp'
  'public/images/industries/cement-industry.webp' = 'https://evomachinery.in/img/cemen-industry-hm.webp'
  'public/images/industries/automotive-industry.webp' = 'https://evomachinery.in/img/automotive-industry-hm.webp'
  'public/images/industries/steel-industry.webp' = 'https://evomachinery.in/img/steel-industry-hm.webp'
  'public/images/industries/wind-mill-energy.webp' = 'https://evomachinery.in/img/wind-mill-energy.webp'
  'public/images/industries/oil-gas-industry.webp' = 'https://evomachinery.in/img/oil-gas-industry.webp'
  'public/images/factory/banner-hero.jpg' = 'https://evomachinery.in/img/slider/bearing-manufacturer-delhi-bnr.jpg'
  'public/images/factory/bearing-assemblies.jpg' = 'https://evomachinery.in/img/Bearing-assemblies-manufacturer-delhi.jpg'
  'public/images/distributors/jk-fenner.png' = 'https://evomachinery.in/img/distributor/jk-fenner-logo.png'
  'public/images/distributors/king-tiger.png' = 'https://evomachinery.in/img/distributor/kt-king-tiger-logo.png'
  'public/images/distributors/max-spare.png' = 'https://evomachinery.in/img/distributor/max-spre-logo.png'
  'public/images/distributors/reynold.png' = 'https://evomachinery.in/img/distributor/reynold-logo.png'
  'public/images/distributors/toyopower.png' = 'https://evomachinery.in/img/distributor/toyopower-logo.png'
}

$wc = New-Object Net.WebClient
$wc.Headers.Add("User-Agent", "Mozilla/5.0")

foreach ($item in $urls.GetEnumerator()) {
  try {
    $wc.DownloadFile($item.Value, $item.Key)
    Write-Host "Success: $($item.Key)"
  } catch {
    Write-Host "Failed: $($item.Key) - $($_.Exception.Message)"
  }
}
