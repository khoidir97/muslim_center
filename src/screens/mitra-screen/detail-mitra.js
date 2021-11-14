import React , { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ScrollView, Image,  TouchableOpacity} from 'react-native';
import {API_URL, GAMBAR} from "@env"
import axios from 'axios';
import { Spinner, Text, Card,  Modal, List, ListItem, Icon} from '@ui-kitten/components';

function App({route}){
    const [galeri, setGaleri] = useState([])
    const [isload, setIsload] = useState(false)
    const [jumlahsantri, setJumlahsantri] = useState("")
    const [jumlahguru, setJumlahguru] = useState("")
    const [hafalan, setHafalan] = useState(0)
    const [visible, setVisible] = useState(false);
    const [gambarmodal, setGambarmodal] = useState("")
    const [programunggulan, setProgramunggulan] = useState([])
    const [data, setData] = useState([])
    const [prestasi, setPrestasi] = useState([])

    useEffect(() => {
        axios.get(`${API_URL}/mitra/detail?id=${route.params.id}`).then((res)=>{
            setData(res.data)
            setIsload(true)
        }).catch(() => {setIsload(false);})

        axios.get(`${API_URL}/mitra/mitragaleri?id=${route.params.id}`).then((respon)=>{
            setGaleri(respon.data);
        })

        axios.get(`${API_URL}/mitra/mitrasantri?id=${route.params.id}`).then((respon)=>{
            setJumlahsantri(respon.data.jumlah_santri);
            setHafalan(respon.data.hafalan_terbanyak)
        })

        axios.get(`${API_URL}/mitra/mitraguru?id=${route.params.id}`).then((respon)=>{
            setJumlahguru(respon.data);
        })

        axios.get(`${API_URL}/mitra/prestasi?id=${route.params.id}`).then((respon)=>{
            setPrestasi(respon.data);
        })

        axios.get(`${API_URL}/mitra/programunggulan?id=${route.params.id}`).then((resp) => {
            setProgramunggulan(resp.data);
        })
    })

    const renderHomeIcon = (props) => (
        <Icon {...props} name='person'/>
    );
    const renderTanggalIcon = (props) => (
        <Icon {...props} name='calendar'/>
    );
    const renderMetodeIcon = (props) => (
        <Icon {...props} name='book-open'/>
    );
    const renderGuruIcon = (props) => (
        <Icon {...props} name='person-add'/>
    );
    const renderSantriIcon = (props) => (
        <Icon {...props} name='person-add'/>
    );
    const renderKetIcon = (props) => (
        <Icon {...props} name='bookmark'/>
    );

    const renderItem = ({ item, index }) => (
        data.map((val, index) => {
            return (
                <View>
                <ListItem
                    title={val.nama}
                    accessoryLeft={renderHomeIcon}
                />
                <ListItem
                    description={jumlahguru}
                    accessoryLeft={renderGuruIcon}
                />
                <ListItem
                    description={jumlahsantri}
                    accessoryLeft={renderSantriIcon}
                />
                <ListItem
                    description={val.metode_pengajaran}
                    accessoryLeft={renderMetodeIcon}
                />
                <ListItem
                    description={val.tanggal}
                    accessoryLeft={renderTanggalIcon}
                />
                <ListItem
                    description={val.keterangan}
                    accessoryLeft={renderKetIcon}
                />
                </View>
            )
        })
        
      );

    return isload ? (
        <ScrollView>
            <View style={{marginHorizontal:1, marginBottom:2}}>
            
            {data.map((val, index) => {
                return (
                    <View style={{marginHorizontal:5, marginTop:1}}>
                        <Image
                            resizeMode='cover'
                            style={{height:300, borderRadius:5}}
                            source={{ uri: val.thumbnail}}
                        />
                    </View>
                )
            })}
            </View>
            <View style={{marginHorizontal:5, marginBottom:2, borderRadius:4}}>
                <List
                    style={{maxHeight:192}}
                    data={data}
                    renderItem={renderItem}
                />
            </View>


            {hafalan != null ? (
                <View style={{marginHorizontal:5, marginBottom:2}}>
                    <Card>
                        <Text status='success' style={{fontWeight:'bold'}}>Jumlah Hafalan Terbanyak {hafalan} Juz</Text>
                    </Card>
                </View>
            ):null}
            
            {programunggulan.length > 0 && prestasi.length > 0 ? ( 
            <View style={{marginHorizontal:5, marginBottom:2}}>
                <Card>
                    <View>
                        {programunggulan.length > 0 ? ( 
                        <>
                        <Text style={{fontWeight:'bold'}} status='success'>Program Unggulan : </Text>
                        {programunggulan.map((val, index)=>{
                            return (
                                <View style={{flexDirection:'row'}} key={index.toString()}>
                                    <Icon
                                        style={{height:20, width:20, marginRight:10}}
                                        name='arrow-right-outline'
                                        fill='grey'
                                    />
                                    <Text style={{color:'grey', paddingBottom:2}}>{val.nama_program}</Text>
                                </View>
                            )
                        })}
                        </>
                        ):null}
                      
                        {prestasi.length > 0 ? (
                        <>
                        <Text style={{fontWeight:'bold'}} status='success'>Prestasi : </Text>
                        {prestasi.map((val, index)=>{
                            return (
                                <View style={{flexDirection:'row'}} key={index.toString()}>
                                    <Icon
                                        style={{height:20, width:20, marginRight:10}}
                                        name='arrow-right-outline'
                                        fill='grey'
                                    />
                                    <Text style={{color:'grey', paddingBottom:2}}>{val.nama_prestasi}</Text>
                                </View>
                            )
                        })}
                        </>
                        ):null}
                    </View>
                </Card>
            </View>
            ):null }


                {galeri.length > 0 ? (
                <>
                <View style={{marginHorizontal:5, marginBottom:2}}>
                    <Card>
                        <Text status='success' style={{fontWeight:'bold'}}>Galeri</Text>
                    </Card>
                </View>

                <View style={{marginBottom:5, backgroundColor:'#ffffff', marginHorizontal:5, borderRadius:4}}>
                
                    <FlatList
                        data={galeri}
                        horizontal
                        pagingEnabled
                        bounces={false}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item})=>{
                            return (
                                <View style={{padding:2}}>
                                        <TouchableOpacity onPress={() => {
                                                setVisible(true); 
                                                setGambarmodal(item.gambar);
                                            }}>
                                            <Image
                                                style={{height:150, width:300, borderRadius:5, margin:5}}
                                                source={{uri : `${GAMBAR}/file_mitra_galeri/thumbnail/${item.gambar}`}}
                                            />
                                        </TouchableOpacity>
                                        <Text style={{padding:5, color:'grey'}}>{item.keterangan}</Text>
                                </View>
                            )
                        }}
                    />
                    
                </View>
                </>
                ):null}
                <Modal
                    visible={visible}
                    backdropStyle={styles.backdrop}
                    onBackdropPress={() => setVisible(false)}>
                        <View>
                            <Image
                                resizeMode='contain'
                                style={{width:300, height:250, borderRadius:5}}
                                source={{ uri: `${GAMBAR}/file_mitra_galeri/${gambarmodal}`}}
                            />
                        </View>
                </Modal>
        </ScrollView>
    ):(
        <View style={{justifyContent: 'center', alignItems:'center', flex:1}}>
            <Spinner status='success'/>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
      minHeight: 192,
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  });

export default App