$Session = New-Object -ComObject "Microsoft.Update.Session"
$Searcher = $Session.CreateUpdateSearcher()
$historyCount = $Searcher.GetTotalHistoryCount()
return ($Searcher.QueryHistory(0, $historyCount) | Select-Object Title, Description, Date | Sort-Object Date)[-1] | Select-Object -Property @{Name="ReadableCreationTime"; Expression={Get-Date $_.Date}}, * -ExcludeProperty Date | ConvertTo-JSON -compress
#  $Session = New-Object -ComObject "Microsoft.Update.Session"
#     $Searcher = $Session.CreateUpdateSearcher()
#     $historyCount = $Searcher.GetTotalHistoryCount()
#     return $Searcher.QueryHistory(0, $historyCount) | Select-Object Title, Description, Date 



#     $Session = New-Object -ComObject "Microsoft.Update.Session"
#     $Searcher = $Session.CreateUpdateSearcher()
#     $historyCount = $Searcher.GetTotalHistoryCount()
#     # return ($Searcher.QueryHistory(0, $historyCount) | Select-Object Title, Description, Date | Sort-Object Date)[-1]
 
# # return ($Searcher.QueryHistory(0, $historyCount) | Select-Object Date | Sort-Object Date)[-1]

# return 1