import React , { useEffect, useState } from 'react';
import {View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import {API_URL} from "@env"
import axios from 'axios';
import { Spinner, Text, Card} from '@ui-kitten/components';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
let page = 0
let maxPage = 0;
function App({navigation}){
    const [data, setData] = useState([])
    const [isload, setIsload] = useState(false)
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        
        async function fetchData() {
            try {
                await loadData(page)
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    },[loadData])

    const trigerPagging =()=>{
        
        page++;
        if(page<=maxPage){
            loadData(page)
        }
    }

    const loadData=async (pages)=>{
        await axios.get(`${API_URL}/penyaluran?page=${pages}`)
        .then(function (response) {
            setIsload(true)
            if(page==0){
                maxPage = response.data.maxData
                setData(response.data.dataResponse)
            }else{
              setData([...data, ...response.data.dataResponse])
            }
        })
        .catch(function (error) {
        })
        .then(function () {
        });
    }

    return isload ?  (
        data.length > 0 ? (
            <FlatList
                data={data}
                keyExtractor={(index,item) => index}
                renderItem={({item})=>{
                    return(
                        <View style={{marginHorizontal:5}}>
                            <Card>
                                {item.cek ? (
                                    <TouchableOpacity onPress={
                                        () => navigation.navigate('Detail Penyaluran',{id: item.id_penyaluran})}>
                                            <Text category='h6'>{item.nama}</Text>
                                            <Text style={{color: 'grey'}}>Target Penyaluran : {item.target}</Text>
                                            <Text style={{fontSize:11}} status='success'>Tanggal Peyaluran : {item.tanggal}</Text>
                                            </TouchableOpacity>
                                ):(
                                    <TouchableOpacity onPress={
                                        () => alert('Belum ada detail')}>
                                        <Text category='h6'>{item.nama}</Text>
                                        <Text style={{color: 'grey'}}>Target Penyaluran : {item.target}</Text>
                                        <Text style={{fontSize:11}} status='success'>Tanggal Peyaluran : {item.tanggal}</Text>
                                    </TouchableOpacity>
                                    
                                )}
                                
                            </Card>
                        </View>
                    )
                }}
                onEndReached={trigerPagging}
                onEndThreshold={5}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                    }
            />
        ):(
            <Text style={{textAlign:'center'}}>Data kosong</Text>
        )
        
            
    ):(
        <View style={{justifyContent: 'center', alignItems:'center', flex:1}}>
            <Spinner status='success'/>
        </View>
    )
}

export default App;