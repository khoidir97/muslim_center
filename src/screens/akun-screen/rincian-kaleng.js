import React , {useState, useEffect } from 'react';
import { View, FlatList, Image, TouchableOpacity} from 'react-native';
import {API_URL, GAMBAR} from "@env"
import axios from 'axios';
import { Spinner, Text, Card, Icon , Tooltip, Button } from '@ui-kitten/components';


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function App({navigation, route}){
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = useState([])
    const [isload, setIsload] = useState(false)
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

   
    useEffect(() => {
        axios.get(`https://kispros.com/api/get_api_detail_pecahan/${route.params.id}`).then((res) => {
           
            setData(res.data);
            setIsload(true)
        })
    },[]);


    const rupiah = (angka) => {
        var	reverse = angka.toString().split('').reverse().join(''),
        ribuan 	= reverse.match(/\d{1,3}/g);
        ribuan	= ribuan.join('.').split('').reverse().join('');

        return ribuan;
    }


        return isload ? (
            <View style={{marginHorizontal:2, marginVertical:5, backgroundColor:'#ebeef2', height:'100%'}} >
                <View>
                    <FlatList
                        data={data}
                        keyExtractor={(item,index) => index.toString()}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        renderItem={({item})=>{
                            return(
                                
                                <View>
                                    <Card style={{marginBottom:5}}>
    
                                            <View style={{flexDirection:'row'}}>
                                                <View style={{flexDirection:'column', width:'50%', textAlign:'left', justifyContent:'center'}} >
                                                    
                                                    <Image
                                                        resizeMode='contain'
                                                        style={{height:70}} 
                                                        source={{uri:`${GAMBAR}/${item.jenis.toLowerCase()}${item.pecahan}.jpg`}}
                                                    />
                                                </View>
                                                <View style={{flexDirection:'column', width:'50%', textAlign:'right'}}>
                                                    <Text  category='h6' status='default' style={{textAlign:'right', fontSize:14}}>{item.pecahan ? 'Rp. '+rupiah(item.pecahan) : 'Belum ada'}</Text>
                                                    <Text style={{textAlign:'right'}}>{item.jml} {item.jenis === 'Logam' ? "Keping" : "Lembar"}</Text>
                                                    <View style={{flexDirection:'row', width:'100%'}}>
                                                        <View style={{flexDirection:'column', width:'100%'}}>
                                                            <Text style={{textAlign:'right', fontWeight:'bold'}} status='success'>Rp. {rupiah(item.pecahan * item.jml)}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                    </Card>         
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
       ):(
        <View style={{justifyContent: 'center', alignItems:'center', flex:1}}>
            <Spinner status='success'/>
        </View>
       )
}


export default App;