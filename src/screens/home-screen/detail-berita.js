import React , { useEffect, useState } from 'react';
import { View, ScrollView, Image,  RefreshControl} from 'react-native';
import {API_URL} from "@env"
import axios from 'axios';
import { WebView } from 'react-native-webview';
import { Spinner, Text, Card} from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient';
import { Badge } from 'react-native-elements'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
function App({route}){
    const [judul, setJudul] = useState("")
    const [isi, setIsi] = useState("")
    const [kategori, setKategori] = useState("")
    const [warna, setWarna] = useState("")
    const [gambar, setGambar] = useState("")
    const [tanggal, setTanggal] = useState("")
    const [video, setVideo] = useState("")
    const [isload, setIsload] = useState(false)
    const linkurl =  `https://www.youtube.com/embed/${youtube_parser(video)}`;

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

   

    function youtube_parser(video){
        var regExp = /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
        var match = video.match(regExp);
        return (match && match[1].length==11)? match[1] : false;
    }

    const Footer = (props) => (
        <LinearGradient
            colors={['#ffffff', '#ffffff', '#ffffff']}>
        <View {...props} style={{ padding:5, marginHorizontal:2}}>
            <View>
                <Badge status='success' value={kategori}/>
                <Text style={{fontWeight:'bold'}}>{judul}</Text>
                <Text style={{color: '#d2d2d2', fontSize:11}}>{tanggal}</Text>
            </View>
        </View>
        </LinearGradient>
    );

    useEffect(() => {
        axios.get(`${API_URL}/berita/detail?id=${route.params.id}`).then((res)=>{
            setGambar(res.data.gambar)
            setVideo(res.data.video)
            setIsi(res.data.isi)
            setJudul(res.data.judul)
            setTanggal(res.data.tanggal)
            setKategori(res.data.kategori)
            setWarna(res.data.warna)
            setIsload(true)
        })
    },[])
    return isload ? (
        <ScrollView
            refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        }>
            <View>
                <View style={{marginHorizontal:8, marginBottom:2, marginVertical:5}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex: 5}}>
                            <Card footer={Footer}>
                                <Image
                                    resizeMode='contain'
                                    style={{height:200, borderRadius:5}}
                                    source={{ uri: gambar}}
                                />
                            </Card>
                            <View style={{backgroundColor:'#fff'}}>
                                <Text style={{textAlign: 'justify', margin:5}}>{isi}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {video ? (
                    <View style={{backgroundColor:'#fff', marginVertical:5, borderRadius:5}}>
                        <View style={{marginHorizontal:5, margin:10}}>
                            <Text style={{fontWeight:'bold'}} status='info'>Video</Text>
                        </View>
                        <View>
                            <View>
                                <WebView
                                    style={{height:200, width:'100%'}}
                                    javaScriptEnabled={true}
                                    source={{
                                    uri: linkurl,
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                ):null}
                
            </View>
        </ScrollView>
        
    ):(
        <View style={{justifyContent: 'center', alignItems:'center', flex:1}}>
            <Spinner status='success'/>
        </View>
    )
}



export default App