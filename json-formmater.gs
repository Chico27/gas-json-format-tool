function myFunction() {
  //1. 現在のスプレッドシートを取得
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  //2. 現在のシートを取得
  var sheet = spreadsheet.getActiveSheet();

  // データリセット
  sheet.getRange(10, 2, sheet.getLastRow() - 1).setValue('');

  //3. 指定するセルの範囲（A1）を取得
  var range = sheet.getRange("B2");
  //4. 値を取得する
  var value = range.getValue();


  output = arrangeJson(value)

  //ログに出力
  Logger.log(output);

  for (var i=0; i<output.length;  i++  ) {
    sheet.getRange(10+i, 2).setValue(output[i]);
  }
}

function arrangeJson(targetStr){
  var output=[];
  var loopSpace = ''
  while (true) {
    startStr = targetStr.indexOf('{')
    endStr = targetStr.indexOf('}')
    if (endStr == -1){
      break
    }
    if (startStr != -1){
      if (startStr < endStr){
        output.push(loopSpace + '{')
        loopSpace += '    '
        targetStr = targetStr.slice(startStr+1)
        startStr = targetStr.indexOf('{')
        endStr = targetStr.indexOf('}')
        if (startStr < endStr){
          if (startStr <= 0){
            continue
          }
          output.push(loopSpace + targetStr.slice(0, startStr))
        } else {
          output.push(loopSpace + targetStr.slice(0, endStr))
        }

      } else {
        if (loopSpace.length != -1){
          loopSpace = loopSpace.slice(4)
        }
        output.push(loopSpace + '}')
        targetStr = targetStr.slice(endStr+1)
        startStr = targetStr.indexOf('{')
        endStr = targetStr.indexOf('}')
        if (startStr != -1){
          if (startStr < endStr){
            if (startStr <= 0){
              continue
            }
            output.push(loopSpace + targetStr.slice(0, startStr))
          } else {
            output.push(loopSpace + targetStr.slice(0, endStr))
          }
        }
      }
    } else {
      if (endStr == 0){
        if (loopSpace.length != -1){
          loopSpace = loopSpace.slice(4)
        }
        output.push(loopSpace + '}')
        targetStr = targetStr.slice(1)
        continue
      }
      output.push(loopSpace + targetStr.slice(0, endStr))
      targetStr = targetStr.slice(endStr)
    }
  }
  return output

}
