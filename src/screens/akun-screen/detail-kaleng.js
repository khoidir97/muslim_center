import React , {useState, useEffect } from 'react';
import { View, FlatList, Image, TouchableOpacity, Linking} from 'react-native';
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
    const [visible, setVisible] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

   
    useEffect(() => {
        axios.get(`https://kispros.com/api/get_api_detail_kaleng/${route.params.id}`).then((res) => {
           
            setData(res.data);
            setIsload(true)
        })
    },[]);

    const fangsen = (rating) => {
        let serah = [];
        if (rating <= 5)
        {
            for(let i=5; i>=1; i--){
                serah.push(
                    <View style={{width:'20%'}}>
                        {rating >= i ? (
                            <Icon
                                style={{height:20,textAlign:'right'}}
                                name = 'star'
                                fill = 'orange'
                            />
                        ):null}
                        
                    </View>
                );
            }
        }
        else 
        {
            serah.push(<View style={{flexDirection:'row', width:'100%'}}>
                <View style={{flexDirection:'column', width:'20%'}}>
                    <Icon
                        style={{height:20,textAlign:'right'}}
                        name = 'award'
                        fill = '#6c7480'
                        />
                </View>
                <View style={{flexDirection:'column', width:'80%'}}>
                    <Text style={{backgroundColor:'#6c7480', borderRadius:5,paddingTop:3,paddingBottom:3, paddingLeft:5,paddingRight:5, color:'white', fontSize:11}} status="basic">Platinum</Text>
                </View>
            </View>);
        }
        return serah;
    }

    const rupiah = (angka) => {
        var	reverse = angka.toString().split('').reverse().join(''),
        ribuan 	= reverse.match(/\d{1,3}/g);
        ribuan	= ribuan.join('.').split('').reverse().join('');

        return ribuan;
    }
    const kanan = (props) => (
        <TouchableOpacity onPress={() => setVisible(true)}>
            <Icon
                name='arrow-forward'
                style={{height:30, width:40}}
                fill= 'green'
            />
        </TouchableOpacity>
    );
    const transfer = (props) => (
        <TouchableOpacity onPress={() => setVisible(true)}>
            <Icon
                name='arrow-forward'
                style={{height:20, width:20, }}
                fill= 'green'
            />
        </TouchableOpacity>
    );

    const kiri = (props) => (
        <TouchableOpacity onPress={() => setVisible(true)}>
            <Icon
                name='arrow-back'
                style={{height:20, width:20}}
                fill= 'red'
            />
        </TouchableOpacity>
    );


        return isload ? (
            <View style={{marginHorizontal:2, marginVertical:5, backgroundColor:'#ebeef2', height:'100%'}} >
                <View>
                    
                    <FlatList
                        data={data}
                        keyExtractor={(item,index) => index.toString()}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        renderItem={({item})=>{
                            
                            let nav = () => navigation.navigate('Rincian Kaleng',{id:item.id, nokwitansi: item.no_kwitansi});
                            if(item.jenis == 3) nav = null;
                            return(
                               
                                <View>
                                    <Card style={{marginBottom:5}}>

                                             <TouchableOpacity onPress={nav}>
                                        
                                       
                                        <View style={{flexDirection:'row'}}>
                                            
                                            <View style={{flexDirection:'column', width:'50%', textAlign:'left', justifyContent:'center'}} >
                                                {item.jenis == 1  ? (
                                                    <Image style={{height:55, width:70}} source={{uri:`${GAMBAR}/dijemput.jpg`}}></Image>
                                                ):item.jenis == 2 ? (
                                                    <Image style={{height:55, width:70}} source={{uri:`${GAMBAR}/diantar.jpg`}}></Image>
                                                ):(
                                                    <Image style={{height:55, width:70}} source={{uri:`${GAMBAR}/atm.jpg`}}></Image>
                                                )}
                                            

                                            </View>
                                            <View style={{flexDirection:'column', width:'50%', textAlign:'right'}}>
                                                <Text style={{textAlign:'right', fontSize:16}}>{item.jml ? 'Rp. '+rupiah(item.jml) : 'Belum ada'}</Text>
                                                
                                                    <View style={{flexDirection:'row', width:'100%'}}>
                                                        <View style={{flexDirection:'column', width:'30%'}}>
                                                            
                                                        </View>
                                                        <View style={{flexDirection:'column', width:'70%'}}>
                                                            <View style={{flexDirection:'row', width:'100%'}}>
                                                                
                                                            {fangsen(item.ratekis).map((dt, index) => {
                                                                return dt; 
                                                            })}
                                                            </View>
                                                            
                                                        </View>
                                                    </View>
                                                    <View style={{flexDirection:'row', width:'100%'}}>
                                                        <View style={{flexDirection:'column', width:'100%'}}>
                                                            <Text  style={{textAlign:'right'}} status='success'> {item.bulan} {item.tahun}</Text>
                                                        </View>
                                                    </View>
                                            </View>
                                        </View>
                                        </TouchableOpacity>
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