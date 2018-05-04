#to show % free space
gwmi Win32_LogicalDisk -Filter "DeviceID='C:'" | select Name, FileSystem,FreeSpace,BlockSize,Size | % {$_.BlockSize=(($_.FreeSpace)/($_.Size))*100;$_.FreeSpace=($_.FreeSpace/1GB);$_.Size=($_.Size/1GB);$_}| Format-Table Name, @{n='FS';e={$_.FileSystem}},@{n='Free, Gb';e={'{0:N2}'-f
$_.FreeSpace}}, @{n='Free,%';e={'{0:N2}'-f $_.BlockSize}} -AutoSize

# to show %used space

If (Test-Path 'C:')
{
    $CDisk = GWMI Win32_LogicalDisk -Filter "DeviceID='C:'"
    $CDisk = @{'Size'      = [Math]::Round($CDisk.Size / 1GB);
               'FreeSpace' = [Math]::Round($CDisk.FreeSpace / 1GB)}
    $CDisk.Add('Usage', ($CDisk.Size - $CDisk.FreeSpace))
    $CDisk.Add('PercentUsage', [Math]::Round(($CDisk.Usage / $CDisk.Size) * 100))

    "C: drive free space: $($CDisk.FreeSpace)GB"
    "C: drive capacity:   $($CDisk.Size)GB"
    '--------------------------------'
    "Disk usage:          $($CDisk.Usage)GB ($($CDisk.PercentUsage)%)"
}