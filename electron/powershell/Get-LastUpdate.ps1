 $Session = New-Object -ComObject "Microsoft.Update.Session"
    $Searcher = $Session.CreateUpdateSearcher()
    $historyCount = $Searcher.GetTotalHistoryCount()
    return ($Searcher.QueryHistory(0, $historyCount) | Select-Object Title, Description, Date | Sort-Object Date)[-1]

    
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