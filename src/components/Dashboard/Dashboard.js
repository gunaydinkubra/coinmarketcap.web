import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import RequestType from './../../model/RequestType'
import { ApiURL } from '../../constants/ApiURL';
import { Redirect } from 'react-router';
import './Dashboard.css';

export default function Dashboard() {
    const [datas, setDatas] = useState();
    const [isCookieInitilizaze, setIsCookieInitilizaze] = useState(true);
    useEffect(() => {
        var checkCookie = document.cookie;
        if (checkCookie == '') {
            setIsCookieInitilizaze(false);
        }
        else {
            setIsCookieInitilizaze(true);
            getCoinMarketCap();
        }
    }, []);

    const getCoinMarketCap = () => {
        const cookie = `${document.cookie}`;
        const cookieParts = cookie.split(`token=`);
        const token = cookieParts[1];
        try {

            const res = {
                method: RequestType.GET,
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            };
            fetch(ApiURL.Query.GetCoinMarketCap, res)
                .then(response => response.json())
                .then(data => setDatas(data));

        } catch (error) {
            console.log(error);
        }
    }

    const refreshDatas = () => {
        getCoinMarketCap();
    }

    return (
        <section>
            <div className="header">
                <Button className="refresh-button" onClick={refreshDatas} basic color='red'>
                    Yenile
            </Button>
            </div>
            {isCookieInitilizaze ?
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Coin</th>
                            <th>Fiyat</th>
                            <th>24s Değişim</th>
                            <th>7g Değişim</th>
                            <th>Market Cap</th>
                            <th>Hacim</th>
                        </tr>
                    </thead>
                    {datas ?
                        <tbody>
                            {datas.map((data) => (
                                <>
                                    <tr key={data.id}>
                                        <td>{data.name}</td>
                                        <td>$ {data.quote.usd.price}</td>
                                        <td>% {data.quote.usd.percentChange24h}</td>
                                        <td>% {data.quote.usd.percentChange7d}</td>
                                        <td>{data.quote.usd.marketCap}</td>
                                        <td>{data.quote.usd.volume24h}</td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                        : null}
                </Table>
                : <div><Redirect to="/" /></div>}
        </section>
    );
}
