import React, {useEffect, useState, useCallback} from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Image } from 'react-native';
import { IndexPath,  Input, Text, Icon, Button, Spinner, Card} from '@ui-kitten/components';
import axios from "axios";
import {API_URL, GAMBAR} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AppRender({route, navigation, setAuth, auth }){
    const [isload, setIsload] = useState(false)
    const [isSave, setisSave] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [nohp, setNohp] = useState("")
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const [nama, setNama] = useState("")
    const [jeniskelamin, setJeniskelamin] = useState("")
    const [kode, setKode] = useState("")
    const logo = `${GAMBAR}/logo.jpg`;


    const url = "http://192.168.43.13/website/web/file_logo/";

    const Daftar = () => {
    //Check for the Name TextInput
    if (!nohp.trim()) {
      alert('Please Enter No Hp');
      return;
    }
    if (!email.trim()) {
        alert('Please Enter Email');
        return;
    }
    if (!password.trim()) {
        alert('Please Enter Password');
        return;
    }

    //Check for the Email TextInput
    
    //Checked Successfully
    //Do whatever you want

    let data = new FormData();
    data.append('no_hp', nohp);
    data.append('email', email);
    data.append('password', password);

    

    try {
        axios.get(`https://kispros.com/api/get_hp_donatur/${nohp}`)
        .then(function (res) {
            
            if(res.data){
                setNama(res.data.don_nama)
                setJeniskelamin(res.data.don_jk)
                setKode(res.data.don_alamat)

                let apidata = new FormData();
                apidata.append('no_hp', nohp);
                apidata.append('email', email);
                apidata.append('password', password);
                apidata.append('fullname', res.data.don_nama);
                apidata.append('address', res.data.don_alamat);
                apidata.append('gender', res.data.don_jk);
                
                setisSave(true)
                axios.post(`${API_URL}/site/daftarkis`, apidata)
                .then(async function (respons) {
                    
                    //alert(response.data)
                    if(respons.data.status == 1){
                        
                        
                        axios.post(`${API_URL}/site/login`, data)
                        .then(async function (response) {
                            setisSave(false)
                            if(response){
                                await AsyncStorage.setItem('auth', response.data.data.token);
                                if(res.data.don_jk == 'Laki-Laki'){
                                    alert('Halo Bapak '+res.data.don_nama+' Pendaftaran anda berhasil.')
                                    navigation.navigate('Dashboard')
                                }else if(res.data.don_jk == 'Perempuan'){
                                    alert('Halo Ibuk '+res.data.don_nama+' Pendaftaran anda berhasil.')
                                    navigation.navigate('Dashboard')
                                }else{
                                    alert('Halo '+res.data.don_nama+' Pendaftaran anda berhasil.')
                                    navigation.navigate('Dashboard')
                                }
                                
                            }
                        })
                        .catch(function (error) {
                            alert('Email atau password salah')
                            setisSave(false)
                        });
                        
                    }else{
                        alert(respons.data)
                        setisSave(false)
                    }
                    
                })
                .catch(function (error) {
                    alert(error);
                    setisSave(false)
                });
            }else{
                setisSave(true)
                axios.post(`${API_URL}/site/daftar`, data)
                .then(async function (response) {
                    if(response.data.status == 1){
                        setisSave(false)
                        alert(response.data.message)
                        navigation.navigate('Login')
                    }else{
                        setisSave(false)
                        alert(response.data.message)
                    }
                    
                })
                .catch(function (res) {
                    alert('error here '+res);
                    setisSave(false)
                    
                });
            }
        })
        .catch(function (error) {
            // handle error
            alert(error);
        })
        .then(function () {
            // always executed
        });
        
    } catch (error) {
        alert('Gagal itu')
    }
    
  };


    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
        </TouchableWithoutFeedback>
    );

    const emailIcon = () => {
        return (
            <Icon
                name='email-outline'
                fill = 'grey'
                style={{height:20, width:20}}
            />
        )
        
    }

    const indikator = (props) => {
        return isSave ? (
        <View style={[props.style, styles.indicator]}>
            <Spinner size='large' status='success'/>
        </View>                     
        ) : null
    }

   

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
            <Card>
                <View style={{alignItems:'center'}}>
                    <Image
                        source={{uri: logo}}
                        style={{height:100, width:100, marginBottom:5}}
                    />
                    <Text style={{color:'#55ac45', fontWeight:'bold'}} >REGISTER</Text>
                </View>
            <View style={{width:250, marginTop:20}}>

                <View style={{ marginBottom: 10}}>
                    <Input 
                        placeholder='No Hp'
                        keyboardType = 'numeric'
                        value={nohp}
                        autoFocus={true}
                        onChangeText={nextValue => setNohp(nextValue)}
                    /> 
                </View>

                <View style={{ marginBottom: 10}}>
                    <Input 
                        placeholder='Email'
                        value={email}
                        onChangeText={nextValue => setEmail(nextValue)}
                    /> 
                </View>

                <View style={{marginBottom: 10}}>
                    <Input
                        value={password}
                        placeholder='Password'
                        accessoryRight={renderIcon}
                        secureTextEntry={secureTextEntry}
                        onChangeText={nextValue => setPassword(nextValue)}
                    />
                </View>   
        
                <View>
                    {isSave ? (
                        <Button onPress={() => Daftar()} status='info'  appearance='outline'  accessoryLeft={indikator}  disabled={true} >
                        Mendaftar
                    </Button>
                    ):(
                        <View>
                            <Button onPress={() => Daftar()} status='success'  accessoryLeft={indikator} style={{marginBottom:10}}>
                                Daftar
                            </Button>
                            <Button onPress={() => navigation.goBack()} status='success' appearance='outline'>
                                Back to Login
                            </Button>
                        </View>
                    )}
                    
                </View>
            </View>
            </Card>
        </View>
    )
}


const styles = StyleSheet.create({
container: {
    paddingTop: 200,
    minHeight: 158,
    
},
indicator: {
    justifyContent: 'center',
    alignItems: 'center',
},
});

