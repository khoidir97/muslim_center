import React , { useEffect, useState } from 'react';
import { View, FlatList,  Image, TouchableOpacity,RefreshControl } from 'react-native';
import {API_URL} from "@env"
import axios from 'axios';
import { Spinner, Text} from '@ui-kitten/components';

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
        await axios.get(`${API_URL}/mitra?page=${pages}`)
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
            console.log(error);
        })
        .then(function () {
        });
    }

    let microtime = new Date().getTime();

    return isload ? (
        <FlatList
            data={data}
            keyExtractor={x => x.id_mitra}
            renderItem={({item})=>{
                return(
                    <View style={{marginHorizontal:5, backgroundColor: 'white', marginBottom:2}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Detail',{id: item.id_mitra})}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{justifyContent: 'center', flexDirection:'column', width:'25%', padding:5}}>
                                    <Image
                                        resizeMode='cover'
                                        style={{height:60, margin:5, borderRadius:4}}
                                        source={{ uri: item.gambar +"?"+ microtime}} 
                                    />
                                </View>
                                <View style={{marginLeft: 3, justifyContent:'center', flexDirection:'column', width:'75%'}}>
                                    <Text style={{fontWeight:'bold',  color:'#4c4a4a'}}>{item.nama}</Text>
                                    <Text style={{fontSize:11}} status='success'>Bergabung : {item.tanggal}</Text>
                                    <Text style={{fontSize:12, color: 'grey'}}>Alamat : {item.alamat}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            }}
            onEndReached={() => {
                trigerPagging()
            }}
            onEndThreshold={1}
            refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
            }
        />
            
    ):(
        <View style={{justifyContent: 'center', alignItems:'center', flex:1, backgroundColor:'#fff', borderRadius:50}}>
            <Spinner status='success'/>
        </View>
    )

}

export default App;