import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image,View, TouchableOpacity} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import { Icon, useTheme, Text} from '@ui-kitten/components';
import home from '../screens/home-screen/home'
import penyaluran from '../screens/penyaluran-screen/penyaluran'
import detailberita from '../screens/home-screen/detail-berita'
import program from '../screens/program-screen/index'
import mitra from '../screens/mitra-screen/mitra'
import detailprogram from '../screens/program-screen/detail-program'
import detailmitra from '../screens/mitra-screen/detail-mitra'
import detailpenyaluran from '../screens/penyaluran-screen/detail-penyaluran'
import login from '../screens/site-screen/login'
import akun from '../screens/akun-screen/akun'
import daftar from '../screens/site-screen/daftar'
//import {GAMBAR} from "@env"
import updateakun from '../screens/akun-screen/update'
import ubahpassword from '../screens/akun-screen/ubah-password'
import siteindex from '../screens/akun-screen/index'
import detail from '../screens/mitra-screen/detail'
import daftarkaleng from '../screens/akun-screen/daftar-kaleng'
import detailkaleng from '../screens/akun-screen/detail-kaleng'
import detailwakaf from '../screens/akun-screen/detail-wakaf'
import detailalpha from '../screens/akun-screen/detail-alpha'
import rinciankaleng from '../screens/akun-screen/rincian-kaleng'

function Home({navigation, route}){
    const Stack = createStackNavigator();
        var tabBarVisible = true;
            if (typeof route.state !== 'undefined') {
                const {routes} = route.state;
            if (routes.length > 1) {
                tabBarVisible = false;
            }
            }
        navigation.setOptions({tabBarVisible});
    return(
    <Stack.Navigator>  
        <Stack.Screen name="Berita" component={home} />
        <Stack.Screen name="Detail Berita" component={detailberita} />
    </Stack.Navigator>
  );
}

function Program({navigation, route}){
    const Stack = createStackNavigator();
        var tabBarVisible = true;
            if (typeof route.state !== 'undefined') {
            const {routes} = route.state;
            if (routes.length > 1) {
                tabBarVisible = false;
            }
            }
        navigation.setOptions({tabBarVisible});
    return(
        <Stack.Navigator>
            <Stack.Screen name="Program" component={program} />
            <Stack.Screen name="Detail Program" component={detailprogram} />
        </Stack.Navigator>
    );
}

function Mitra({navigation, route}){
    const Stack = createStackNavigator();
        var tabBarVisible = true;
            if (typeof route.state !== 'undefined') {
                const {routes} = route.state;
            if (routes.length > 1) {
                tabBarVisible = false;
            }
            }
        navigation.setOptions({tabBarVisible});
    return(
        <Stack.Navigator>
            <Stack.Screen name="Mitra" component={mitra} />
            <Stack.Screen name="Detail" component={detail} options={{
                headerTitle: 'Detail Mitra'}}/>
            <Stack.Screen name="Detail Mitra" component={detailmitra} />
        </Stack.Navigator>
    );
}



function Penyaluran({navigation, route}){
    const Stack = createStackNavigator();
        var tabBarVisible = true;
            if (typeof route.state !== 'undefined') {
                const {routes} = route.state;
            if (routes.length > 1) {
                tabBarVisible = false;
            }
            }
        navigation.setOptions({tabBarVisible});
    return(
        <Stack.Navigator>
            <Stack.Screen name="Penyaluran" component={penyaluran} />
            <Stack.Screen name="Detail Penyaluran" component={detailpenyaluran} />
        </Stack.Navigator>
    );
}

function Akun({navigation, route}) {
    const Stack = createStackNavigator();
    var tabBarVisible = true;
            if (typeof route.state !== 'undefined') {
                const {routes} = route.state;
            if (routes.length > 1) {
                tabBarVisible = false;
            }
            }
        navigation.setOptions({tabBarVisible});
    return(
        <Stack.Navigator>
            <Stack.Screen name="index" component={siteindex} options={{headerShown: true,
                headerTitle: () => (
                    <View style={{flexDirection:'row'}}>
                        <Image
                            style={{height:50, width:50}}
                            source={{ uri: `https://www.donasirumahtahfizh.com/logo.jpg` }}
                        />
                        <View style={{justifyContent:'center', marginLeft:5}}>
                            <Text category='h5' style={{color:'#57ab45'}}>Donasi</Text>
                        </View>
                        
                    </View>
                    
                ),
                headerRight: () => (
                        
                    <View style={{margin:10}}>
                        <TouchableOpacity  onPress={() => navigation.navigate('Akun')}>
                            <Icon
                                style={{height:30}}
                                fill='#00e096'
                                name='person'
                            />
                            <Text status='success' style={{fontSize:11}}>Akun</Text>
                        </TouchableOpacity>
                    </View>
                    
                ), }} />
            <Stack.Screen name="Akun" component={akun}/>
            <Stack.Screen name="Update" component={updateakun} />
            <Stack.Screen name="Ubah Password" component={ubahpassword} />
            <Stack.Screen name="Daftar Kaleng" component={daftarkaleng} />
            <Stack.Screen name="Detail Kaleng" component={detailkaleng}  options={({ route }) => ({ title: "Detail Kaleng "+route.params.otherParam })}/>
            <Stack.Screen name="Detail Wakaf" component={detailwakaf} />
            <Stack.Screen name="Detail Alpha" component={detailalpha} />
            <Stack.Screen name="Rincian Kaleng" component={rinciankaleng}   options={({ route }) => ({ title: "Rincian Kaleng ("+route.params.nokwitansi+")" })}/>
        </Stack.Navigator>
    );
}

const Tab = createBottomTabNavigator();
const IsIcon = ({ name, color }) => (
    <Icon fill={color} name={name} style={{ width: 24, height: 24, padding: 0 }} />
)
const isText = ({ styles }) => (
    <Text style={styles} ></Text>
)
const AkunScreen = () => {
    const theme = useTheme()
    let iconLabel = "";
    return(
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName, isColor, isFontStyle;
                        if (route.name === 'Berita') {
                            iconName = !focused ? 'file-text-outline' : 'file-text';
                            isColor = !focused ? theme['color-success-default'] : theme['color-success-default'];
                            isFontStyle = !focused ? 'normal' : 'bold';
                        } else if (route.name === 'Program') {
                            iconName = !focused ? 'star-outline' : 'star';
                            isColor = !focused ? theme['color-success-default'] : theme['color-success-default'];
                            isFontStyle = !focused ? 'normal' : 'bold';
                        } else if (route.name === 'Mitra') {
                            iconName = !focused ? 'layers-outline' : 'layers';
                            isColor = !focused ? theme['color-success-default'] : theme['color-success-default'];
                            isFontStyle = !focused ? 'normal' : 'bold';
                        }else if (route.name === 'Penyaluran') {
                            iconName = !focused ? 'car-outline' : 'car';
                            isColor = !focused ? theme['color-success-default'] : theme['color-success-default'];
                            isFontStyle = !focused ? 'normal' : 'bold';
                        } else {
                            iconName = !focused ? 'home-outline' : 'home';
                            isColor = !focused ? theme['color-success-default'] : theme['color-success-default'];
                            isFontStyle = !focused ? 'normal' : 'bold';
                        }
                        return (<><IsIcon name={iconName} color={isColor} /><Text status='success' style={{fontWeight:isFontStyle, fontSize:11, paddingTop:5}} >{route.name}</Text></>);
                    },
                })}
                
                tabBarOptions={{
                    activeTintColor: '#00e096',
                    inactiveTintColor: '#00e096',
                    showLabel: false,
                    style: {
                        label : false,
                        //borderTopColor: '#00e096',
                        //backgroundColor: 'transparent',
                        // elevation: 10,
                        //shadowOffset: { width: 5, height: 5 },
                        borderTopWidth: 0,
                        shadowOpacity: 0.1,
                        height: 55,
                      },
                }}
            >
                <Tab.Screen name="Dashboard" component={Akun} />
                <Tab.Screen name="Berita" component={Home} options={{headerShown : true}}/>
                <Tab.Screen name="Program" unmountOnBlur={true} component={Program}/>
                <Tab.Screen name="Mitra" component={Mitra}  />
                <Tab.Screen name="Penyaluran" component={Penyaluran} />
                
            </Tab.Navigator>
    )
}

const RenderTabNavigator = () => {
    
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={'AkunScreen'} component={AkunScreen} options = {{ headerShown : false}}/> 
                <Stack.Screen name={'Login'} component={login} options = {{ headerShown : false}}/> 
                <Stack.Screen name={'Daftar'} component={daftar} options = {{ headerShown : false}}/> 
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default RenderTabNavigator;
