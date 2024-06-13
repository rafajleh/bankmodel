import React, { useEffect, useState } from 'react';
import QRCode from "react-qr-code";
import BASE_URL from '../../config/config';

export const QrcodeDisplayData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let total = 0;
  
  useEffect(() => {
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    fetchData(params.get('nid'), params.get('mobile'));
  }, []);

  const fetchData = async (nid, mobile) => {
    try {
      const response = await fetch(`${BASE_URL}/api/qrcode/getuserdatabyqr?nid=${encodeURIComponent(nid)}&mobile=${encodeURIComponent(mobile)}`); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      // console.log(await response.json())
      setData(await response.json());
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handelAddPayment = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/qrcode/addpayment?uid=${data._id}`); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      // console.log(await response.json())
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fontsize = {'font-size': '16px', 'border': '1px solid #DDD', 'padding': '10px'}
  const borderS1 = { 'padding': '1rem','color': 'white','border-width': '3px','border-style': 'solid','border-image': 'linear-gradient(to bottom, red, rgba(0, 0, 0, 0) ) 1 100%' }

  const imageUrls = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg'];
  const randomImageUrl = 'src/assets/imgs/userimg/' + imageUrls[Math.floor(Math.random() * imageUrls.length)]
  
  return (
    <div>
      <div style={borderS1} className="min-h-screen max-w-4xl w-full mx-auto flex flex-col gap-4 p-4 md:p-10">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table className="w-full !text-xs text-gray-500" style={{"backgroundImage": "url('/src/assets/imgs/b1.jpg')"}}>
            <tr>
                <td className="font-semibold" style={{'background': '#FFF', 'font-size': '14px', 'text-align': 'left'}}>
                  <a>Close</a>
                </td>
                <td colSpan={2} className="font-semibold" style={{'background': '#FFF', 'font-size': '14px', 'text-align': 'right'}}>
                  <a onClick={() => handelAddPayment()}>Add Payment</a>
                </td>
            </tr>
            <tr>
                <td colSpan={3} className="font-semibold" style={{'background': '#26285ad4', 'color': '#FFF', 'padding': '20px', 'font-size': '20px', 'text-align': 'center'}}>DIGITAL BANK</td>
            </tr>
            <tr>
                <td className="font-semibold" style={fontsize}>Name</td>
                <td className="font-bold" style={fontsize}>{data.user_name}</td>
                <td rowSpan={4}>
                  <img src={randomImageUrl} style={{width: '120px', height: '130px', position: 'relative', left: '50%'}} />
                </td>
            </tr>
            <tr>
                <td className="font-semibold" style={fontsize}>Mobile Number</td>
                <td className="font-bold" style={fontsize}>0{data.phone}</td>
            </tr>
            <tr>
                <td className="font-semibold" style={fontsize}>Address</td>
                <td className="font-bold" style={fontsize}>{data.full_addresse}</td>
            </tr>
            <tr>
                <td className="font-semibold" style={fontsize}>NID</td>
                <td className="font-bold" style={fontsize}>{data.nid_no}</td>
            </tr>
            <tr>
                <td className="font-semibold" style={fontsize}>Account Open in</td>
                <td className="font-bold" style={fontsize}>{data.reqBank}</td>
                <td></td>
            </tr>
            <tr>
                <td className="font-semibold" style={fontsize}>Total Balance</td>
                <td className="font-bold" style={fontsize}>{data.trnxHistory?.balance} BDT</td>
                <td></td>
            </tr>
            <tr>
                <td colSpan={3}>
                  <table className="w-full !text-xs text-gray-500 ">
                    <tr style={{'background': '#999', 'color': '#FFF'}}>
                      <th width="150px" className="font-semibold" style={fontsize}>Date</th>
                      <th className="font-semibold" style={fontsize}>Discription</th>
                      <th width="150px" className="font-semibold" style={{...fontsize, 'text-align': 'right'}}>Amount</th>
                    </tr>
                    {data.trnxHistory?.deposit_logs?.map((val, key) => {
                        total+=val.depositted_amount;
                    })}
                    <tr>
                        <td style={fontsize}>{data.trnxHistory?.createdAt.split("T")[0]}</td>
                        <td style={fontsize}>1 Deposite</td>
                        <td style={{...fontsize, 'text-align': 'right'}}>{data.trnxHistory?.balance - total}</td>
                    </tr>
                    {data.trnxHistory?.deposit_logs?.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td style={fontsize}>{val.createdAt.split("T")[0]}</td>
                                <td style={fontsize}>{key+2} Deposite</td>
                                <td style={{...fontsize, 'text-align': 'right'}}>{val.depositted_amount}</td>
                            </tr>
                        )
                    })}
                  </table>
                </td>
            </tr>
        </table>
      )}
        <table className="w-full !text-xs text-gray-500 ">
          <tr>
            <td colSpan={2} style={{fontWeight: 700}}>
              <br /><br />This is a system generated certificate which certified that, your account was opened successfully approved by Bangladesh Bank. Your payment history also provide here. If any query, feel free to call central authority help desk at 16324.
              <br /><br /><br />
            </td>
          </tr>
          <tr>
            <td>
              {/* <img src="src/assets/imgs/qr.jpg" style={{width: '100px', height: '100px'}} /> */}
              <div style={{ background: 'white', padding: '16px' }}>
                <QRCode 
                  size={100}
                  style={{ height: "auto", maxWidth: "100px", width: "100px" }}
                  value={`http://localhost:3000/qrcode?nid=${data.nid_no}&mobile=${data.phone}`}
                  viewBox={`0 0 256 256`} 
                />
              </div>
            </td>
            <td style={{textAlign: 'right'}}>
              <img src="src/assets/imgs/s2.jpg" style={{width: '200px', height: '100px', position: 'relative', left: '50%'}} />
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{textAlign: 'right'}}>
              <span style={{borderTop: '1px solid #000', fontWeight: '700'}}>Governor of Central Authority System</span><br /><br />
            </td>
          </tr>
          <tr>
            <td style={{'background': '#333', 'width': '50%', 'color': '#FFF', 'padding-left': '20px', 'font-weight': '700'}}>your trust is our success</td>
            <td style={{'background': '#333', 'width': '50%'}}><img src="src/assets/imgs/1.jpg" /></td>
          </tr>
        </table>
      </div>
    </div>
  );
};
