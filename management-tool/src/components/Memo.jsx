import React,{ memo, useEffect, useState} from "react";
import DownloadButton from './DownloadButton'; 

function Memo() {

  //入力データを保存
  const[name, setName] = useState("");
  const [status, setStatus] = useState("");
  const[memos, setMemos ]=useState(()=>{
    const savedMemos = localStorage.getItem('my_customer_memos');
    return savedMemos? JSON.parse(savedMemos):[];
  });
  const[url, setUrl ]=useState("");

  //データをlocalStorageに保存
  useEffect(() => {
    localStorage.setItem('my_customer_memos',JSON.stringify(memos));
  },[memos]);

  //データを変数に変換
  const handleAddMemo =() =>{
  const n = name.trim();
  const u = url.trim();
  if (!n) return;

  //データを出力
  setMemos([...memos, { id: Date.now(), name: n, status: status, url:u }]);
  setName("");
  setStatus("");
  setUrl("");
};

//メモを削除する
const handleDeleteMemo = (id) => {
  setMemos(memos.filter((memo) => memo.id !== id));
};

//プルダウンメニュー
const words =[ "公式キャラ" , "リードキャラ" , "一般"];


//入力フォームエリア
return(
<div>
<div className="contener_wrap">
<div  className="contener_form">
  <div className="wrap f-box">
      作品：
      <input type="text" 
      value={name} 
      onChange={(e) =>setName(e.target.value)}
      placeholder="参加する企画名"/>
  </div>

  <div  className="wrap">
  URL：
  <input type="text" 
    value={url} 
    onChange={(e) =>setUrl(e.target.value)}
    placeholder="作品URL"/> 
  立ち位置：
  <select value={status} onChange={(e) => setStatus(e.target.value)}>
  <option value="">---------</option>
  {words.map((word) => (
    <option key={word} value={word}>
      {word}
    </option>
    ))}
  </select>
  </div>
</div>
<div  className="button_wrap">
    <button onClick={handleAddMemo}>追加</button>
</div>
</div>

  <br />
  
    <table>
      <tbody>
        <tr>
          <th>作品</th>
          <th>リンク</th>
          <th className="short">立ち位置</th>
          <th></th>
        </tr>
      {memos.map((memo) => (
        <tr key={memo.id}>
        <td>{memo.name}</td>
        <td>{memo.url?(
          <a href={memo.url}
          target="_blank"
          rel="noreferrer"
          style={{ color: "#3734da", textDecoration: "underline", cursor: "pointer" }}
          >{memo.url}
          </a>
        ):(
          <span style={{ color: "#3734da" }}>未登録</span>
        )}
        </td>
        <td className="short">{memo.status}</td>
        
        <td><button onClick={() => handleDeleteMemo(memo.id)}>削除</button></td>
        </tr>
      ))}
      </tbody>
  </table>
  <DownloadButton data={memos} />
 </div>
    );

}

 export default Memo;