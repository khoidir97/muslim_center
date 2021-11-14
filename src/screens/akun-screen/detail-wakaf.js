import React , {useState, useEffect } from 'react';
import { View, FlatList, Image, Linking} from 'react-native';
import {API_URL, GAMBAR} from "@env"
import axios from 'axios';
import { Spinner, Text, Card, Icon } from '@ui-kitten/components';


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function App({navigation, route}){
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = useState([]);
    const [wakaflink, setLinkwakaf] = useState("");
    const [isload, setIsload] = useState(false)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

   
    useEffect(() => {
        axios.get(`https://kispros.com/api/get_api_detail_wakaf/${route.params.no_hp}`).then((res) => {
            
            setData(res.data);
            setIsload(true);
                
        });
        axios.get(`https://kispros.com/api/get_donasi/${route.params.no_hp}`).then((respons) => {
            setLinkwakaf(respons.data.linkwakaf);
        });
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

        return isload ? (
            data.length > 0 ? (
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
                                                    <Image style={{height:55, width:70}} source={{uri:`${GAMBAR}/wakaf.jpg`}}></Image>
                                                </View>
                                                <View style={{flexDirection:'column', width:'50%', textAlign:'right'}}>
                                                    <Text style={{textAlign:'right', fontSize:16}}>{item.jml ? 'Rp. '+rupiah(item.jml) : 'Belum ada'}</Text>
                                                    
                                                        <View style={{flexDirection:'row', width:'100%'}}>
                                                            <View style={{flexDirection:'column', width:'50%'}}>
                                                                
                                                            </View>
                                                            <View style={{flexDirection:'column', width:'50%'}}>
                                                                <View style={{flexDirection:'row', width:'100%'}}>
                                                                    
                                                                {fangsen(item.ratewakaf).map((dt, index) => {
                                                                    return dt; 
                                                                })}
                                                                </View>
                                                                
                                                            </View>
                                                        </View>
                                                        <View style={{flexDirection:'row', width:'100%'}}>
                                                            <View style={{flexDirection:'column', width:'100%'}}>
                                                                <Text  style={{textAlign:'right'}} status='success'> {item.tgl}</Text>
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
                <View style={{backgroundColor:'white', alignItems:'center', justifyContent:'center', flex:1}}>
                    <Text status='success' style={{padding:10}} category='h5'>Belum ada wakaf nih</Text>
                    <View style={{flexDirection:'row'}}>
                    <Icon
                        name='arrow-forward-outline'
                        style={{height:20, width:20}}
                        fill='grey'
                    />
                    <Text onPress={() => Linking.openURL(wakaflink)} status="info">Yuk wakaf disini</Text>
                    <Icon
                        name='arrow-back-outline'
                        style={{height:20, width:20}}
                        fill='grey'
                    />
                    </View>
                </View>
            )
            
       ):(
        <View style={{justifyContent: 'center', alignItems:'center', flex:1}}>
            <Spinner status='success'/>
        </View>
       )
}


export default App;