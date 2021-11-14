import React, {useState} from 'react';
import { StyleSheet, View,TouchableWithoutFeedback, Image  } from 'react-native';
import {  Input, Text, Icon, Button, Spinner, Card} from '@ui-kitten/components';
import axios from "axios";
import {API_URL, GAMBAR} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AppRender({navigation}){
    const [isSave, setisSave] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [hpform, setHpform] = useState(true)
    const [nohp, setNohp] = useState("")
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const logo = `${GAMBAR}/logo.jpg`;
 
    const indikator = (props) => {
        return isSave ? (
        <View style={[props.style, styles.indicator]}>
            <Spinner size='large' status='success'/>
        </View>                     
        ) : null
    }

    const change = () =>{
        if(hpform){
            setHpform(false)
        }else{
            setHpform(true)
        }
    }
  
    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
        </TouchableWithoutFeedback>
    );

    const Loginbyhp = async () => {

        if (!nohp.trim()) {
            alert('Please Enter No Hp');
            return;
        }
        if (!password.trim()) {
            alert('Please Enter Password');
            return;
        }
        setisSave(true)

        let data = new FormData();
        data.append('no_hp', nohp);
        data.append('password', password);
        try {
            axios.post(`${API_URL}/site/login-number`, data)
            .then(async function (response) {
                setisSave(false)
                if(response){
                    await AsyncStorage.setItem('auth', response.data.data.token);
                    alert('login Berhasil')
                    navigation.navigate('Dashboard')
                }
            })
            .catch(function () {
                alert('No Hp atau password salah')
                setisSave(false)
            });
        } catch (error) {
            alert('Gagal')
        }
    }

    const Login = async () => {

        if (!email.trim()) {
            alert('Please Enter Email');
            return;
        }
        if (!password.trim()) {
            alert('Please Enter Password');
            return;
        }
        setisSave(true)

        let data = new FormData();
        data.append('email', email);
        data.append('password', password);
        try {
            axios.post(`${API_URL}/site/login`, data)
            .then(async function (response) {
                setisSave(false)
                if(response){
                    await AsyncStorage.setItem('auth', response.data.data.token);
                    alert('login Berhasil')
                    navigation.navigate('Dashboard')
                }
            })
            .catch(function () {
                alert('Email atau password salah')
                setisSave(false)
            });
        } catch (error) {
            alert('Gagal')
        }
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
            <Card> 
                <View style={{justifyContent: 'center', alignItems:'center'}}>
                    <Image
                        source={{uri: logo}}
                        style={{height:100, width:100, marginBottom:5}}
                    />
                    <Text style={{color:'#55ac45', fontWeight:'bold'}} >ASSALAMU'ALAIKUM</Text>
                </View>
            
                    <View style={{width:250, marginTop:20}}>

                        {hpform ? (
                            <View style={{ marginBottom: 20}}>
                                <Input 
                                    placeholder='Email'
                                    value={email}
                                    onChangeText={nextValue => setEmail(nextValue)}
                                /> 
                            </View>
                        ):(
                            <View style={{ marginBottom: 20}}>
                                <Input 
                                    placeholder='No Hp'
                                    keyboardType = 'numeric'
                                    value={nohp}
                                    onChangeText={nextValue => setNohp(nextValue)}
                                /> 
                            </View>
                        )}
                        

                        <View style={{marginBottom: 20}}>
                            <Input
                                value={password}
                                placeholder='Password'
                                accessoryRight={renderIcon}
                                secureTextEntry={secureTextEntry}
                                onChangeText={nextValue => setPassword(nextValue)}
                            />
                        </View>   
                
                        <View>
                            {hpform ? (
                                <>
                                {isSave ? (
                                    <Button onPress={() => Login()} status='info'  appearance='outline'  accessoryLeft={indikator} disabled={true}>
                                    Login
                                    </Button>
                                ):(
                                    <Button onPress={() => Login()} status='success'  accessoryLeft={indikator} >
                                    Login
                                    </Button>
                                )}
                                </>
                            ):(
                                <>
                                {isSave ? (
                                    <Button onPress={() => Loginbyhp()} status='info'  appearance='outline'  accessoryLeft={indikator} disabled={true}>
                                    Login
                                    </Button>
                                ):(
                                    <Button onPress={() => Loginbyhp()} status='success'  accessoryLeft={indikator} >
                                    Login
                                    </Button>
                                )}
                                </>
                            )}
                            
                            {hpform ? (
                                <Button onPress={() => change()} status='success' appearance='outline'  style={{marginTop:20}}>
                                Login by Nomor Hp
                                </Button>
                            ):(
                                <Button onPress={() => change()} status='success' appearance='outline' style={{marginTop:20}}>
                                Login By Email
                                </Button>
                            )}
                            <Text style={{marginTop:20}} onPress={()=> navigation.navigate('Daftar')} status='info'>Belum punya akun ?</Text>
                        </View>
                    </View>    
                </Card>
        </View>
    );
    

};

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



