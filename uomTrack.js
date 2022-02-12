
function edit_row(no){

    document.getElementById("edit_button"+no).style.display="none";
    document.getElementById("save_button"+no).style.display="block";
	
    var name=document.getElementById("name"+no);
    var country=document.getElementById("country"+no);
    var time=document.getElementById("time"+no);

    var name_data=name.innerHTML;
    var country_data=country.innerHTML;
    var time_data=time.innerHTML;

    name.innerHTML="<input type='text'  id='name_text"+no+"'  value='"+name_data+"'>";
    country.innerHTML="<input type='text'  id='country_text"+no+"'  value='"+country_data+"'>";
    time.innerHTML="<input type='text'  id='time_text"+no+"'  value='"+time_data+"'>";
}

function save_row(no){
    var name_val=document.getElementById("name_text"+no).value;
    var country_val=document.getElementById("country_text"+no).value;
    var time_val=document.getElementById("time_text"+no).value;

    document.getElementById("name"+no).innerHTML=name_val;
    document.getElementById("country"+no).innerHTML=country_val;
    document.getElementById("time"+no).innerHTML=time_val;

    document.getElementById("edit_button"+no).style.display="block";
    document.getElementById("save_button"+no).style.display="none";

}

function delete_row(no){
    document.getElementById("row"+no+"").remove();
}

function addRow(no){ 
    var row = document.getElementById("row"+no+""); 
    var table = document.getElementById("myIDtable");
    var clone = row.cloneNode(true); 
    table.appendChild(clone); 
}  


cPrev = -1; // global var saves the previous c, used to determine if the same column is clicked again

function sortBy(c) {
    document.getElementById("myIDtable").deleteTFoot();
    rows = document.getElementById("myIDtable").rows.length; // num of rows
    columns = document.getElementById("myIDtable").rows[0].cells.length; // num of columns
    arrTable = [...Array(rows)].map(e => Array(columns)); // create an empty 2d array

    for (ro=0; ro<rows; ro++) { // cycle through rows
        for (co=0; co<columns; co++) { // cycle through columns
        // assign the value in each row-column to a 2d array by row-column
            arrTable[ro][co] = document.getElementById("myIDtable").rows[ro].cells[co].innerHTML;
        }
    }

    th = arrTable.shift(); // remove the header row from the array, and save it
    
    if (c !== cPrev) { // different column is clicked, so sort by the new column
        arrTable.sort(
            function (a, b) {
                if (a[c] === b[c]) {
                    return 0;
                } else {
                    return (a[c] < b[c]) ? -1 : 1;
                }
            }
        );
    } else { // if the same column is clicked then reverse the array
        arrTable.reverse();
    }

    cPrev = c; // save in previous c

    arrTable.unshift(th); // put the header back in to the array
    
    // cycle through rows-columns placing values from the array back into the html table
    for (ro=0; ro<rows; ro++) {
        for (co=0; co<columns; co++) {
            document.getElementById("myIDtable").rows[ro].cells[co].innerHTML = arrTable[ro][co];
        }
    }
    var MyFooter = document.getElementById("myIDtable").createTFoot();
    var MyRow = MyFooter.insertRow(0);
    var MyCell0 = MyRow.insertCell(0);
    var MyCell1 = MyRow.insertCell(1);
    var MyCell2 = MyRow.insertCell(2);
    var MyCell3 = MyRow.insertCell(3);
    var MyCell4 = MyRow.insertCell(4);
    MyCell1.innerHTML = findBest();  
    MyCell2.innerHTML = findWorst(); 
    MyCell3.innerHTML = findAvg(); 
    }


function findBest() {
    var table = document.getElementById("myIDtable"), maxVal;

    for(var i = 1; i < table.rows.length-1; i++){
        if(i === 1){
            maxVal = table.rows[i].cells[3].innerHTML;
        }
        else if(maxVal < table.rows[i].cells[3].innerHTML){
            maxVal = table.rows[i].cells[3].innerHTML;
        }
    }
    return "Max Value = "+maxVal;
}
document.getElementById("f1").innerHTML = findBest();


function findWorst() {
    var table = document.getElementById("myIDtable"), minVal;

    for(var i = 1; i < table.rows.length-1; i++){
        if(i === 1){
            minVal = table.rows[i].cells[3].innerHTML; 
        }
        else if(minVal > table.rows[i].cells[3].innerHTML){
            minVal = table.rows[i].cells[3].innerHTML;
        }
    }
    return "Min Value = "+minVal;
}
document.getElementById("f2").innerHTML = findWorst();


function findAvg(){
    var table = document.getElementById("myIDtable"), avgVal, sumVal = 0, 
    rowCount = table.rows.length - 2;

    for(var i = 1; i < table.rows.length-1; i++){
        sumVal = sumVal + parseFloat(table.rows[i].cells[3].innerHTML);
    }
    return "Average Value = " + (sumVal / rowCount).toFixed(3);
    
}
document.getElementById("f3").innerHTML = findAvg();


function show3better()
{
    document.getElementById("buttonBest").style.display="none";
    document.getElementById("buttonAll").style.display="block";

    var largArr = new Array();
    var table = document.getElementById("myIDtable");
    largArr[0] = 20;
    largArr[1] = 20;
    largArr[2] = 20;

    for (i = 0; i < table.rows.length-1; i++) {
        if (table.rows[i].cells[3].innerHTML < largArr[0]) {
            largArr[0] = table.rows[i].cells[3].innerHTML;

        }
    }
    for (i = 0; i < table.rows.length-1; i++) {
        if (table.rows[i].cells[3].innerHTML  < largArr[1]
            && table.rows[i].cells[3].innerHTML > largArr[0]) {
            largArr[1] = table.rows[i].cells[3].innerHTML ;

        }
    }
    for (i = 0; i < table.rows.length-1; i++) {
        if (table.rows[i].cells[3].innerHTML < largArr[2]
            && table.rows[i].cells[3].innerHTML > largArr[1]) {
            largArr[2] = table.rows[i].cells[3].innerHTML;
        }
    }

    for (i = 0; i < table.rows.length-1; i++){
        if(table.rows[i].cells[3].innerHTML != largArr[0]){
            if(table.rows[i].cells[3].innerHTML != largArr[1]){
                if(table.rows[i].cells[3].innerHTML != largArr[2]) {
                    table.rows[i].style.display="none";
                }
            }   
        }  
    }
}

function showAll(){
    var table = document.getElementById("myIDtable");
    for (i = 0; i < table.rows.length-1; i++){
        table.rows[i].style = "block";
    }

    document.getElementById("buttonBest").style.display="block";
    document.getElementById("buttonAll").style.display="none";
}


function hide_show_table(col_name)
{
	var checkbox_val=document.getElementById(col_name).value;
	if(checkbox_val=="hide")
	{
		var all_col=document.getElementsByClassName(col_name);
		for(var i=0;i<all_col.length;i++)
		{
			all_col[i].style.display="none";
		}
		document.getElementById(col_name+"_head").style.display="none";
		document.getElementById(col_name).value="show";
	}
	
	else
	{
		var all_col=document.getElementsByClassName(col_name);
		for(var i=0;i<all_col.length;i++)
		{
			all_col[i].style.display="table-cell";
		}
		document.getElementById(col_name+"_head").style.display="table-cell";
		document.getElementById(col_name).value="hide";
	}
}


