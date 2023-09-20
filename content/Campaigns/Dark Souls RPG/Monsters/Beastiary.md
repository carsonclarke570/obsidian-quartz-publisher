```dataview
>  LIST FROM #monster 
>  WHERE (!category OR category = "CATEGORY")
> 	 AND file.name != "Monster"
> ```