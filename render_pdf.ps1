Add-Type -AssemblyName Windows.Data.Pdf
Add-Type -AssemblyName System.Runtime.WindowsRuntime

$pdfFile = 'C:\Users\muend\myClaudeCodeProjects\musician-website\mavhungu_presskit.pdf'
$outDir  = 'C:\Users\muend\myClaudeCodeProjects\musician-website'

$asTaskGeneric = ([System.WindowsRuntimeSystemExtensions].GetMethods() |
    Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and
    $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]

function Await($WinRtTask, $ResultType) {
    $asTaskSpecific = $asTaskGeneric.MakeGenericMethod($ResultType)
    $netTask = $asTaskSpecific.Invoke($null, @($WinRtTask))
    $netTask.Wait(-1) | Out-Null
    $netTask.Result
}

function AwaitAction($WinRtTask) {
    $asTask = ([System.WindowsRuntimeSystemExtensions].GetMethods() |
        Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and
        $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncAction' })[0]
    $netTask = $asTask.Invoke($null, @($WinRtTask))
    $netTask.Wait(-1) | Out-Null
}

$storageFile = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($pdfFile)) ([Windows.Storage.StorageFile])
$doc = Await ([Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($storageFile)) ([Windows.Data.Pdf.PdfDocument])

Write-Host "Pages: $($doc.PageCount)"

for ($i = 0; $i -lt $doc.PageCount; $i++) {
    $page    = $doc.GetPage($i)
    $outPath = "$outDir\presskit_p$($i+1).png"
    $stream  = [Windows.Storage.Streams.InMemoryRandomAccessStream]::new()
    $opts    = [Windows.Data.Pdf.PdfPageRenderOptions]::new()
    $opts.DestinationWidth = 1400
    AwaitAction ($page.RenderToStreamAsync($stream, $opts))
    $reader  = [System.IO.WindowsRuntimeStreamExtensions]::AsStream($stream)
    $ms      = [System.IO.MemoryStream]::new()
    $reader.CopyTo($ms)
    [System.IO.File]::WriteAllBytes($outPath, $ms.ToArray())
    Write-Host "Saved presskit_p$($i+1).png"
}
