import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, FlatList, Image, View,SafeAreaView, Dimensions} from 'react-native';
import { Component } from 'react';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-picker';

const {width,height} = Dimensions.get('window')
export default class ProfilePicker extends Component {
    constructor(props) {
        super(props);
        this.state ={
            fileList: []
        }
    }
    onSelectedImage = (image) => {
        let onDataImg = this.state.fileList;
        const source = {uri: image.path};
        let item = {
            id: Date.now(),
            url: source,
            content: image.data
        };
        newDataImg.push(item);
        this.setState({fileList: newDataImg})
    }
    takePhotoFromCamera = () =>{
        ImagePicker.launchCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            this.onSelectedImage(image);
            console.log(image);
          });
    }
    choosePhotoFromGallery(){
        ImagePicker.launchImageLibrary({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            this.onSelectedImage(image);
            console.log(image);
          });
    }
    showActionSheet = () => {
        this.ActionSheet.show()
      }
renderItem = ({item, index}) => {
    <View>
        <Image source={item.url} style={styles.itemImage}/>
    </View>
}
      render() {
          let {fileList} = this.state;
        return (
           <SafeAreaView style={styles.container}>
            
          <ActionSheet style={styles.bottomSheet}
              ref={o => this.ActionSheet = o}
              title={'Select Image From'}
              options={['Camera', 'Gallery', 'cancel']}
              cancelButtonIndex={2}
              destructiveButtonIndex={1}
              onPress={(index) => { 
                  switch(index){
                      case 0:
                        this.takePhotoFromCamera();
                        break;
                      case 1:
                        this.choosePhotoFromGallery();
                        break;
                      default:
                        break;
                  }
              }}
            />
            <View>
            
            <View style={styles.imageBox} onPress={this.showActionSheet}></View>
            <Button style={styles.btnStyle} onPress={this.showActionSheet} title="Add Image"></Button>
           
          </View>
          <FlatList
                data={fileList}
                renderItem ={this.renderItem}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.state}
            />
           </SafeAreaView> 
          
        )
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImage: {
      backgroundColor:'#2F455C',
      height: 150,
      width: width - 60,
      borderRadius: 8,
      resizeMode: 'contain'
  },
  iconStyle: {
      width: 40,
      height: 40,
      backgroundColor: "yellow",
      top: -50,
      
    alignSelf: 'flex-end',
      borderRadius: 20
  },
  btnStyle: {
      position:'absolute',
      bottom:0,
      marginHorizontal: 20, 
      borderRadius: 8
  },
  imageBox:{
      marginTop: 70,
      width: 200,
      height: 200,
      opacity: 0.6,
      backgroundColor:'#77787a',
      borderRadius: 80
  },
  bottomSheet: {
      width: width-10,
      borderTopEndRadius: 50,
      marginHorizontal: 20
  }
  
});
