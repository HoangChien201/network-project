import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import Video from 'react-native-video';
import USER from './User';
import TEXTAREA from './TextArea';
import OPTIONS from './Options';
import { COLOR } from '../../constant/color';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Icon from 'react-native-vector-icons/Feather';

const renderMedia = ({ media, setMedia, setShowModal }) => {
    const [playingVideo, setPlayingVideo] = useState(null);
    const [viewMore, setViewMore] = useState(false);

    const handleMediaSelect = (uris) => {
        setMedia(uris);
        console.log(media);
    };
    const deleteImage = (uri) => {
        const updatedImages = media.filter(media => media !== uri);
        setMedia(updatedImages);
        console.log(updatedImages);

    };
    const togglePlayVideo = (uri) => {
        setPlayingVideo(playingVideo === uri ? null : uri);
    };

    if (!media || media.length === 0) {
        return null;
    }
    const numMedia = media.length;
    if (numMedia === 1) {
        return (
            <View style={styles.oneMediaContainer}>

                {media.map((uri, index) => (
                    uri.endsWith('.mp4') ? (
                        <View key={index} style={styles.mediaContainer}>
                            <Video
                                source={{ uri }}
                                style={styles.oneMedia}
                                resizeMode="cover"
                                paused={playingVideo !== uri}
                                repeat={true}
                            />
                            <TouchableOpacity
                                style={styles.playButton}
                                onPress={() => togglePlayVideo(uri)}
                            >
                                <Text style={styles.playButtonText}>
                                    {playingVideo === uri ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                </Text>
                            </TouchableOpacity>
                            <View>
                                <Image source={{ uri: item }} style={styles.image} resizeMode="contain" />

                            </View>
                        </View>
                    ) : (
                        <View style={styles.oneMedia}>
                            <Image key={index} source={{ uri }} style={styles.oneMedia} resizeMode="contain" />
                        </View>

                    )
                ))}
            </View>
        );
    } else if (numMedia === 2) {
        return (
            
            <View style={styles.twoMediaContainer}>

                {media.map((uri, index) => (
                    uri.endsWith('.mp4') ? (
                        <View key={index} style={styles.mediaContainer}>
                            <Video
                                source={{ uri }}
                                style={styles.twoMedia}
                                resizeMode="cover"
                                paused={playingVideo !== uri}
                                repeat={true}
                            />
                            <TouchableOpacity
                                style={styles.playButton}
                                onPress={() => togglePlayVideo(uri)}
                            >
                                <Text style={styles.playButtonText}>
                                    {playingVideo === uri ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.mediaContainer}>
                            <Image key={index} source={{ uri }} style={styles.oneMedia} resizeMode="contain" />
                        </View>
                    )
                ))}
            </View>
        );
    } else if (numMedia === 3) {
        return (
            <TouchableOpacity style={styles.threeMediaContainer} onPress={() => setViewMore(true)}>
                <View style={styles.media1ContainerOf3}>
                    {media[0].endsWith('.mp4') ? (
                        <View style={styles.media1of3}>
                            <Video
                                source={{ uri: media[0] }}
                                style={styles.mediaFill}
                                resizeMode="cover"
                                paused={playingVideo !== media[0]}
                                repeat={true}
                            />
                            <TouchableOpacity
                                style={styles.playButton}
                                onPress={() => togglePlayVideo(media[0])}
                            >
                                <Text style={styles.playButtonText}>
                                    {playingVideo === media[0] ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Image source={{ uri: media[0] }} style={styles.mediaFill} resizeMode="cover" />
                    )}
                </View>
                <View style={styles.threeMedia23Container}>
                    <View style={styles.media23Container}>
                        {media[1].endsWith('.mp4') ? (
                            <View style={styles.media1of3}>
                                <Video
                                    source={{ uri: media[1] }}
                                    style={styles.mediaFill}
                                    resizeMode="cover"
                                    paused={playingVideo !== media[1]}
                                    repeat={true}
                                />
                                <TouchableOpacity
                                    style={styles.playButton}
                                    onPress={() => togglePlayVideo(media[1])}
                                >
                                    <Text style={styles.playButtonText}>
                                        {playingVideo === media[1] ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <Image source={{ uri: media[1] }} style={styles.mediaFill} resizeMode="cover" />
                        )}
                    </View>
                    <View style={styles.media23Container}>
                        {media[2].endsWith('.mp4') ? (
                            <View style={styles.media1of3}>
                                <Video
                                    source={{ uri: media[2] }}
                                    style={styles.mediaFill}
                                    resizeMode="cover"
                                    repeat={true}
                                    paused={playingVideo !== media[2]}

                                />
                                <TouchableOpacity
                                    style={styles.playButton}
                                    onPress={() => togglePlayVideo(media[2])}
                                >
                                    <Text style={styles.playButtonText}>
                                        {playingVideo === media[2] ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <Image source={{ uri: media[2] }} style={styles.mediaFill} resizeMode="cover" />
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    } else {
        return (
            <View style={styles.multipleMediaContainer}>
                <View style={styles.media1ContainerOf3}>
                    {media[0].endsWith('.mp4') ? (
                        <View style={styles.media1of3}>
                            <Video
                                source={{ uri: media[0] }}
                                style={styles.mediaFill}
                                resizeMode="cover"
                                paused={playingVideo !== media[0]}
                                repeat={true}
                            />
                            <TouchableOpacity
                                style={styles.playButton}
                                onPress={() => togglePlayVideo(media[0])}
                            >
                                <Text style={styles.playButtonText}>
                                    {playingVideo === media[0] ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Image source={{ uri: media[0] }} style={styles.mediaFill} resizeMode="cover" />
                    )}
                </View>
                <View style={styles.multipleMedia23Container}>
                    <View style={styles.multiplemediaContainer}>
                        {media[1].endsWith('.mp4') ? (
                            <View style={styles.media1of3}>
                                <Video
                                    source={{ uri: media[1] }}
                                    style={styles.mediaFill}
                                    resizeMode="cover"
                                    paused={playingVideo !== media[1]}
                                    repeat={true}
                                />
                                <TouchableOpacity
                                    style={styles.playButton}
                                    onPress={() => togglePlayVideo(media[1])}
                                >
                                    <Text style={styles.playButtonText}>
                                        {playingVideo === media[1] ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <Image source={{ uri: media[1] }} style={styles.mediaFill} resizeMode="cover" />
                        )}
                    </View>
                    <View style={styles.multiplemediaContainer}>
                        {media[2].endsWith('.mp4') ? (
                            <View style={styles.media1of3}>
                                <Video
                                    source={{ uri: media[2] }}
                                    style={styles.mediaFill}
                                    resizeMode="cover"
                                    repeat={true}
                                    paused={playingVideo !== media[2]}

                                />
                                <TouchableOpacity
                                    style={styles.playButton}
                                    onPress={() => togglePlayVideo(media[2])}
                                >
                                    <Text style={styles.playButtonText}>
                                        {playingVideo === media[2] ? <Icon name="pause-circle" size={24} color={'#fff'} /> : <Icon name="play-circle" size={24} color={'#fff'} />}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <Image source={{ uri: media[2] }} style={styles.mediaFill} resizeMode="cover" />
                        )}
                    </View>
                    {numMedia > 3 && (
                        <TouchableOpacity style={styles.multiplemediaContainer} onPress={() => setShowModal(true)}>
                            <Text style={styles.viewMoreText}>View More</Text>
                            <Image source={{ uri: media[3] }} style={styles.viewMore} resizeMode="cover" />
                        </TouchableOpacity>
                    )}
                </View>


            </View>
        );
    }
};
export default renderMedia;
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '90%',
        width: '100%',
        borderTopStartRadius: 36,
        borderTopEndRadius: 36,
    },
    buttonCloseSwitch: {
        backgroundColor: COLOR.PrimaryColor, height: 28, width: 28, position: 'absolute', top: 10, end: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 5
    },
    header: {
        width: '100%',
    },
    image: {
        width: 380,
        height: '90%',
        margin: 5,
    },
    textDeleteImage: {
        color: 'white',
    },
    buttonDeleteImage: {
        height: 38,
        width: 38,
        borderRadius: 10,
        position: 'absolute',
        end: 5,
        bottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5,
    },
    imageContainer: {
        width: 388,
        height: 300,
        marginTop: 20,
    },
    containerMedia: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    itemContainer: {
        width: '100%',
        marginBottom: 10,
    },
    oneMediaContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 300
    },
    media1ContainerOf3: {
        height: '100%',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2, // Độ dày của khung
        borderColor: '#ddd', // Màu của khung
        overflow: 'hidden',
        borderRadius: 10,
    },
    oneMedia: {
        width: '100%',
        backgroundColor: 'white',
        height: '100%'
    },
    twoMediaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        height: 300,
        width: '100%',

    },
    twoMedia: {
        width: '100%',
        height: '100%'
    },
    threeMediaContainer: {
        flexDirection: 'row',
        height: 300,
    },
    threeMedia23Container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    media23Container: {
        height: '49%',
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1, // Độ dày của khung
        borderColor: '#ddd', // Màu của khung
    },
    multiplemediaContainer: {
        height: '32%',
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1, // Độ dày của khung
        borderColor: '#ddd', // Màu của khung

    },
    viewMore: {
        overflow: 'hidden',
        height: '100%',
        width: '100%',
        opacity: 0.6
    },
    mediaFill: {
        height: '100%',
        width: '100%',
    },
    multipleMediaContainer: {
        marginBottom: 5,
        flexDirection: 'row',
        height: 300,
        justifyContent: 'space-between'
    },

    multipleMedia23Container: {
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    viewMoreButton: {
        aspectRatio: 2,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewMoreText: {
        fontSize: 16,
        fontWeight: 'bold',
        position: 'absolute',
        zIndex: 99,
        color: 'white',
        backgroundColor: 'black',
        padding: 2,
        borderRadius: 5
    },
    mediaContainer: {
        height: '100%',
        width: '49%',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1, // Độ dày của khung
        borderColor: '#ddd', // Màu của khung

    },
    playButton: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.PrimaryColor,
        padding: 5,
        borderRadius: 5,
        opacity: 0.6
    },
    playButtonText: {
        color: 'white',

    },
    media1of3: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
