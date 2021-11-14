import React , {useState, useEffect } from 'react';
import { View, FlatList, Image, column,TouchableOpacity} from 'react-native';
import {API_URL, GAMBAR} from "@env"
import axios from 'axios';
import { Spinner, Text, Card, Button, Icon } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native"


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function App({navigation}){
    const [auth, setAuth]= useState("")
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = useState([])
    const [nohp, setNohp] = useState("")
    const [alpha, SetAlpha] = useState("")
    const [ratealpha, SetRatealpha] = useState("")
    const [kis, setKis] = useState("")
    const [ratekis, SetRatekis] = useState("")
    const [ratewakaf, setRatewakaf] = useState("")
    const [wakaf, setWakaf] = useState("")
    const [kaleng, setKaleng] = useState("")
    const [isload, setIsload] = useState(false)
    const logo = `${GAMBAR}/logo.jpg`;
    const onRefresh = React.useCallback(() => {
        axios.get(`https://kispros.com/api/get_donasi/${nohp}`).then((res) => {
           
            setKis(res.data.kis);
            setWakaf(res.data.wakaf);
            setRatewakaf(res.data.ratewakaf)
            SetRatekis(res.data.ratekis)
            setKaleng(res.data.kaleng);
            if (res.data.alpha)
            {
                SetAlpha(res.data.alpha);
                SetRatealpha(res.data.ratealpha);
            }
            setIsload(true)
        });
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            cek()
        })
    );

    const cek = async() => {
        setAuth(await AsyncStorage.getItem('auth'));
        
        axios.get(`https://kispros.com/api/get_donasi/${nohp}`).then((res) => {
           
            setKis(res.data.kis);
            setWakaf(res.data.wakaf);
            setRatewakaf(res.data.ratewakaf)
            SetRatekis(res.data.ratekis)
            setKaleng(res.data.kaleng);
            if (res.data.alpha)
            {
                SetAlpha(res.data.alpha);
                SetRatealpha(res.data.ratealpha);
            }
            setIsload(true)
        });

        axios.get(`${API_URL}/site/gettoken?token=${auth}`).then((res)  => {
            
            setData(res.data.data)
            setNohp(res.data.no_hp)
            
        });
    }

    



    const logOut=()=>{
        AsyncStorage.clear();
        alert('Anda telah logout')
        setAuth() 
    }   
    
    const loginIcon = (props) => (
        <Icon {...props} name='log-in-outline'/>
    );

    const phoneIcon = (props) => (
        <Icon {...props} name='power'/>
    );

    const award = (props) => (
        <Icon {...props} name='award-outline'/>
    );

    const rupiah = (angka) => {
        var	reverse = angka.toString().split('').reverse().join(''),
        ribuan 	= reverse.match(/\d{1,3}/g);
        ribuan	= ribuan.join('.').split('').reverse().join('');

        return ribuan;
    }
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
        

    //    console.log(GAMBAR);
    
    
    

   if(auth){
        return isload ? (
            <>
            <View style={{marginHorizontal:2, marginVertical:5, backgroundColor:'#ebeef2', height:'100%'}} >
                <View>
                    <FlatList
                        data={data}
                        keyExtractor={index => index}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        renderItem={({item})=>{
                            return(
                                <View>
                                    <Text  category='h3'  status='default' style={{textAlign:'center', fontWeight:'bold', padding:10}} onPress={() => navigation.navigate('Update')}>Donasi Anda</Text>
                                    
                                        <Card style={{marginTop:5}}>
                                         
                                        <TouchableOpacity onPress={() => navigation.navigate('Daftar Kaleng',{no_hp : nohp})}>

                                        <View style={{flexDirection:'row'}}>
                                            <View style={{flexDirection:'column', width:'50%', textAlign:'left', justifyContent:'center'}} >
                                                <Image style={{height:55, width:70}} source={{uri:`${GAMBAR}/kis.jpg`}}></Image>
                                            </View>
                                            <View style={{flexDirection:'column', width:'50%', textAlign:'right'}}>
                                                
                                            
                                                <Text  category='h6' status='default' style={{textAlign:'right'}}> {kis ? 'Rp. '+rupiah(kis) : 'Belum ada'}</Text>
                                                <View style={{flexDirection:'row', width:'100%'}}>
                                                    <View style={{flexDirection:'column', width:'50%'}}>
                                                        
                                                    </View>
                                                    <View style={{flexDirection:'column', width:'50%'}}>
                                                        <View style={{flexDirection:'row', width:'100%'}}>
                                                            
                                                        {fangsen(ratekis).map((dt) => {
                                                            return dt; 
                                                        })}
                                                        </View>
                                                        
                                                    </View>
                                                </View>
                                                {kaleng ? (
                                                <View style={{flexDirection:'row', width:'100%'}}>
                                                    <View style={{flexDirection:'column', width:'100%'}}>
                                                        <Text style={{textAlign:'right', fontSize:11}} status='success'>Jumlah Kaleng : {kaleng}</Text>
                                                    </View>
                                                </View>
                                                ):null}
                                            </View>
                                        </View>
                                        </TouchableOpacity>
                                    </Card>
                                            
                                        <Card style={{marginTop:5}}>
                                            <TouchableOpacity onPress={() => navigation.navigate('Detail Wakaf',{no_hp: nohp})}>    
                                            <View style={{flexDirection:'row'}}>
                                                <View style={{flexDirection:'column', width:'50%', textAlign:'left', justifyContent:'center'}}>
                                                <Image style={{height:55, width:60}} source={{uri:`${GAMBAR}/wakaf.jpg`}}></Image>
                                                </View>
                                                <View style={{flexDirection:'column', width:'50%', textAlign:'left'}}>

                                                    <Text category='h6' status='default' style={{textAlign:'right'}}>{wakaf ? 'Rp. '+rupiah(wakaf) : 'Belum ada'}</Text>
                                                    
                                                    <View style={{flexDirection:'row', width:'100%'}}>
                                                        <View style={{flexDirection:'column', width:'50%'}}>
                                                            
                                                        </View>
                                                        <View style={{flexDirection:'column', width:'50%'}}>
                                                            <View style={{flexDirection:'row', width:'100%'}}>
                                                                
                                                            {fangsen(ratewakaf).map((dt) => {
                                                                return dt; 
                                                            })}
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                            </TouchableOpacity>
                                        </Card>
                                        <Card style={{marginTop:5}}>    
                                            <TouchableOpacity onPress={() => navigation.navigate('Detail Alpha',{no_hp: nohp})}>
                                            <View style={{flexDirection:'row'}}>
                                                <View style={{flexDirection:'column', width:'50%', textAlign:'left', justifyContent:'center'}}>
                                                <Image style={{height:55, width:60}} source={{uri:`${GAMBAR}/alpha.jpg`}}></Image>
                                                </View>
                                                <View style={{flexDirection:'column', width:'50%', textAlign:'left'}}>

                                                    <Text category='h6' status='default' style={{textAlign:'right'}}>{alpha ? 'Rp. '+rupiah(alpha) : 'Belum ada'}</Text>
                                                    
                                                    <View style={{flexDirection:'row', width:'100%'}}>
                                                        <View style={{flexDirection:'column', width:'50%'}}>
                                                            
                                                        </View>
                                                        <View style={{flexDirection:'column', width:'50%'}}>
                                                            <View style={{flexDirection:'row', width:'100%'}}>
                                                                
                                                            {fangsen(ratealpha).map((dt) => {
                                                                return dt; 
                                                            })}
                                                            </View>
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
    <View style={{position:'absolute', width:'100%', bottom:0, alignItems:'center', marginBottom:5}}>
        <View style={{width:'90%'}}>
            <Button  status='danger' onPress={() => logOut()}  accessoryLeft={phoneIcon} style={{height:50}}>
                Logout
            </Button>
        </View>
    </View>
</>
       ):(
        <View style={{justifyContent: 'center', alignItems:'center', flex:1}}>
            <Spinner status='success'/>
        </View>
       )
   }else{
        return (
            <View style={{backgroundColor:'white', justifyContent:'center', flex:1}}>
                
                    <View style={{alignItems:'center'}}>
                        <Image
                            source={{uri: logo}}
                            style={{height:150, width:150, marginBottom:5}}
                        />
                        <Text style={{marginBottom:20, marginTop:20, fontSize:16, textAlign:'center'}}  status='success'>
                            Silahkan login untuk mengetahui jumlah donasi anda
                        </Text>
                    </View>
                    <Button  status='success' onPress={()=> navigation.navigate('Login')} accessoryLeft={loginIcon} style={{margin:20}}>
                        Login 
                    </Button>
            </View>
        )
   }
}



export default App;