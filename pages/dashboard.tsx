import { useEffect, useState } from 'react';
import { Table } from '@mantine/core';
import Cookies from 'js-cookie';
import { axios } from 'src/lib/axios';

export default function Dashboard() {
  const [elements, setElements] = useState([]);
  const [user, setUser] = useState([]);


  useEffect(() => {

    const fetchUser = async () => {
      try {
        const mail = Cookies.get('email');
        const response = await axios.get(`/getdata?mail=${mail}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchUser()

    const fetchTransactions = async () => {
      try {
        const accountNumber = parseInt(Cookies.get('account') as any);
        console.log(typeof accountNumber);
        const response = await axios.get(`/transaction?account=${accountNumber}`);
        setElements(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  },[]);

  const ths = (
    <tr>
      <th>Time</th>
      <th>From</th>
      <th>To</th>
      <th>Amount</th>
    </tr>
  );

  const rows = elements.map((element) => (
    <tr key={(element as any).id}>
      <td>{(element as any).time}</td>
      <td>{(element as any).from}</td>
      <td>{(element as any).to}</td>
      <td>{(element as any).amount}</td>
    </tr>
  ));

  return (
    <div className='main'>
      <div className='big'>
			  <div className='lft1'>
            <div className='caption1'>
        					<p>Transaction History</p>
					  </div>
          <Table striped highlightOnHover>
            <thead>{ths}</thead>
            <tbody>{rows}</tbody>
          </Table>
        </div>
        <div className="vl"></div>
        <div className='rgt1'>
            <div className='caption1'>
        					<p>Account Information</p>
					  </div>
          {user && (
            <div>
            <div className = 'item'> <p><b>Email :</b> {(user as any).email} </p></div>
            <div className = 'item'> <p><b>Account Number :</b> {(user as any).account} </p></div>
            <div className = 'item'>  <p> <b>Curernt balance : </b>{(user as any).balance}  </p></div>
            <div className = 'item'>  <p> <b>Secret Key : </b>{(user as any).secret_key}  </p></div>
            </div>
          )} 
        </div>
      </div>
    </div>
  );
}
