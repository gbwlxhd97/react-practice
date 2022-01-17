import { useEffect, useState } from "react";
import {Switch,Route, useLocation, useParams } from "react-router";
import styled from "styled-components";
import Chart from './Chart';
import Price from './Price';
import { Link, useRouteMatch } from "react-router-dom";

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const OverViewWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-self: center;
    padding: 10px 20px;
    border-radius:10px;
    background-color: blueviolet;
    margin: 20px 0px;
`;

const OverViewItem = styled.div`
    text-align: center;
`
const Description = styled.div`
    margin: 0 auto;
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 7px 0px;
    border-radius: 10px;
    color: ${(props) =>
        props.isActive ? props.theme.accentColor : props.theme.textColor};
    a {
        display: block;
    }
`;

interface RouteParams {
    coinId: string;
}
interface RouteState {
    name: string;
}

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
        };
    };
}

function Coin() {
    const [loading, setLoading] = useState(true);
    const { coinId } = useParams<RouteParams>();
    const { state } = useLocation<RouteState>();
    const [info, setInfo] = useState<InfoData>();
    const [priceInfo, setPriceInfo] = useState<PriceData>();
    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");
    useEffect(() => {
        (async () => {
        const infoData = await (
            await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
        ).json();
        const priceData = await (
            await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
        ).json();
        setInfo(infoData);
        setPriceInfo(priceData);
        setLoading(false)
        })();
    }, [coinId]);
    return (
        <Container>
        <Header>
            <Title>{state?.name || "Loading..."}</Title>
        </Header>
        {loading ? <Loader>Loading...</Loader> : (
        <>
        <OverViewWrap>
            <OverViewItem>
                <div>RANK</div>
                <div>{info?.rank}</div>
            </OverViewItem>
            <OverViewItem>
                <div>SYMBOL</div>
                <div>{info?.symbol}</div>    
            </OverViewItem>
            <OverViewItem>
                <div>Open Source</div>
                <div>{info?.open_source ? "Yes" : "No"}</div>    
            </OverViewItem>    
        </OverViewWrap>
        <Description>
            {info?.description}
        </Description>
        <OverViewWrap>
            <OverViewItem>
                <div>TOTAL SUPPLY</div>
                <div>{priceInfo?.total_supply}</div>   
            </OverViewItem>
            <OverViewItem>
                <div>MAX SUPPLY</div>
                <div>{priceInfo?.max_supply}</div>
            </OverViewItem>
        </OverViewWrap>

        <Tabs>
            <Tab isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
        </Tabs>
        <Switch>
            <Route path={`/:coinId/price`}>
                <Price />
            </Route>
            <Route path={`/:coinId/chart`}>
                <Chart />
            </Route>
        </Switch>
        </>
        )}
        </Container>
    );
}
export default Coin;