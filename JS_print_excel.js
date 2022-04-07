var array1 = new Array();
var array2 = new Array();
var n = 4 ; //Total table
for ( var x=1; x<=n; x++ ) {
    array1[x-1] = x;
    array2[x-1] = x + 'th';
}

var tablesToExcel2 = (function () {

    var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>'
        , templateend = '</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>'
        , body = '<body>'
        , tablevar = '<table>{table'
        , tablevarend = '}</table>'
        , bodyend = '</body></html><br>'
        , espacio = '<br>'
        , worksheet = '<x:ExcelWorksheet><x:Name>'
        , worksheetend = '</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>'
        , worksheetvar = '{worksheet'
        , worksheetvarend = '}'
        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
        , wstemplate = ''
        , tabletemplate = '';

    return function (table, name, filename) {
        var tables = table;

        for (var i = 0; i < tables.length; ++i) {
            wstemplate += worksheet + worksheetvar + i + worksheetvarend + worksheetend + espacio;
            tabletemplate += tablevar + i + tablevarend  + espacio;
        }

        var allTemplate = template + wstemplate + templateend;
        var allWorksheet = body + tabletemplate + espacio + bodyend;
        var allOfIt = allTemplate + allWorksheet + espacio;

        var ctx = {};
        for (var j = 0; j < tables.length; ++j) {
            ctx['worksheet' + j] = name[j];
        }
        for (var k = 0; k < tables.length; ++k) {
            var exceltable;
            if (!tables[k].nodeType) exceltable = document.getElementById(tables[k]);
            ctx['table' + k] = exceltable.innerHTML;
        }
        //document.getElementById("dlink").href = uri + base64(format(template, ctx));
        document.getElementById("dlink").href = uri + base64(format(allOfIt, ctx));
        document.getElementById("dlink").download = filename;
        document.getElementById("dlink").click();
        //window.location.href = uri + base64(format(allOfIt, ctx));
        wstemplate = "";
        tabletemplate = "";
    }
})();

//...Call the function and pass parameters
//first array the tables id's 
//second name of the sheet
tablesToExcel2([],[], 'filename.xls')
