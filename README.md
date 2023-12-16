# 設計書
## Editor
- line: プログラムそれぞれの行
- block: lineの中の変数や値などユーザーが変更可能な部分
- text: lineの中のユーザーが変更不可能な部分
### ブロック一覧
- VariableBlock
    新しい変数を設定するブロック
- VariableSelectBlock
    変数の値を更新するブロック
- StringBlock, NumberBlock
    文字列を設定するブロック
- FunctionSelectBlock
    関数を選択するブロック。ただし「()」の部分はテキスト
### テキスト一覧
- ReservedText
    「もし」などの予約語