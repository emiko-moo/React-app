

const DownloadButton = ({data}) =>{
    const handleDownloadCSV = () =>{
        if(!data ||data.length === 0 )return;
        const headers = ["作品名", "URLリンク" , "立ち位置"];
        const csvRows =[
            headers.join(","),
            ...data.map((row)=>{
                const safeName = `"${String(row.name ||"").replace(/"/g,'""')}"`;
                const safeUrl = `"${String(row.url ||"").replace(/"/g,'""')}"`;
                const safeStatus = `"${String(row.status ||"").replace(/"/g,'""')}"`;
                
                return [safeName,safeUrl,safeStatus].join(",")
            })
        ];
        const csvContent = csvRows.join("\r\n");
        //文字化け防止
        const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
        const blob = new Blob([bom, csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        //ダウンロード実行
        const link = document.createElement("a");
        link.href = url;
        link.download = "バックアップ.csv";
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <button 
          onClick={handleDownloadCSV} 
          disabled={!data || data.length === 0}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: (!data || data.length === 0) ? 'not-allowed' : 'pointer',
            opacity: (!data || data.length === 0) ? 0.5 : 1
          }}
        >
          この表をダウンロードする
        </button>
      );
};
export default DownloadButton;