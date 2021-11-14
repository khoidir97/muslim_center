import React , { useEffect, useState } from 'react';
import {Text, View, FlatList, Image,  TouchableOpacity, RefreshControl } from 'react-native';
import {API_URL} from "@env"
import axios from 'axios';
import { Card,Spinner} from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
let page = 0
let maxPage = 0;
export default function App({navigation}){
    const [data, setData] = useState([])
    const [baru, setBaru] = useState([])
    const [datakategori, setDatakategori] = useState([])
    const [selectedKategori, setSelectedKategori] = useState(null);
    const [load, isload] = useState(false)

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    
    useEffect(() => {

        axios.get(`${API_URL}/berita/baru`)
        .then((res) => {
            setBaru(res.data)
            
        })
        
        axios.get(`${API_URL}/berita/selek`)
        .then((res) => {
            isload(true)
            setDatakategori(res.data)
        })
        .catch(() => {
        });
        async function fetchData() {
            try {
                await loadData(page, selectedKategori)
            } catch (e) {
            }
        };
        fetchData();
    },[loadData])

    const trigerPagging =()=>{
        page++;
        if(page<=maxPage){
            loadData(page, selectedKategori)
        }
    }

    const loadData=async (pages, kat)=>{
        await axios.get(`${API_URL}/berita?page=${pages}&kategori=${kat}`)
        .then(function (response) {
            
            if(page==0){
                maxPage = response.data.maxData
                setData(response.data.dataResponse)
                isload(true)
            }else{
              setData([...data, ...response.data.dataResponse])
              isload(true) 
            }
        })
        .catch(function () {
        })
        .then(function () {
        });
    }

    const getDataByKategori = async (value)=>{
        page=0;
        setSelectedKategori(value);
        loadData(page, value)

    }    
  
    
    return load ? (
        <>
        
        <FlatList
            data={data}
            keyExtractor={(index) => index+1}
            renderItem={({item})=>{
                return  (
                    data.length > 0 ? (
                        <View style={{marginHorizontal:5, backgroundColor: 'white', marginBottom:1}}>
                            <TouchableOpacity onPress={() => navigation.navigate('Detail Berita',{id: item.id_berita})} >
                                <View style={{flexDirection:'row'}}>
                                    <View style={{justifyContent: 'center'}}>
                                        <Image
                                            size='large'
                                            style={{height:70, width:70, margin:5, borderRadius:4}}
                                            source={{ uri: item.thumbnail}} />
                                    </View>
                                    <View style={{flex: 5, marginLeft: 5, justifyContent:'center'}}>
                                        <Text>{item.judul}</Text>
                                        <Text style={{color: item.warna}}>{item.kategori}</Text>
                                        <Text style={{fontSize:11, color: 'grey'}}>{item.tanggal}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ):(
                        <View style={{textAlign:'center', justifyContent:'center'}} >
                            <Text>Data kosong</Text>
                        </View>
                        
                    )
                    
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
            ListHeaderComponent={()=>{
                return(
                    <View>
                       
                        <View style={{marginHorizontal : 5}}>
                            <Card >
                                {baru.map((val) => {
                                    return (
                                            <View>
                                                <TouchableOpacity onPress={() => navigation.navigate('Detail Berita',{id: val.id_berita})} >
                                                    <Image
                                                        style={{height:200, borderRadius:5}}
                                                        source={{ uri: val.gambar}}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                                
                                    )
                                })}
                                
                            </Card>
                        </View>
                        <View style={{marginHorizontal:5}}>
                            <FlatList
                                data={datakategori}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(index) => index}
                                renderItem={({item})=>{
                                    return  (
                                        <View style={{marginVertical:4, backgroundColor:'#fff', padding:2}}>
                                            <TouchableOpacity  onPress={() => getDataByKategori(item.id_kategori)}>
                                                
                                                    <Text style={{margin:4, padding:6, backgroundColor:item.id_kategori==selectedKategori?'#e6e6e6':'transparent', borderRadius:50, borderWidth:1, borderColor:'#e8e6e6', color:'black' }}>{item.nama}</Text>
                                                   
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    </View>
                )
            }}
        />
    </>
        
    ):(
        <View style={{justifyContent: 'center', alignItems:'center', flex:1}}>
            <Spinner status='success'/>
        </View>
    );
}

