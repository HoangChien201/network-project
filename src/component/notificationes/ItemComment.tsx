
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { COLOR } from '../../constant/color'
import { DateOfTimePost } from '../../format/DateOfTimePost'
import { useNavigation } from '@react-navigation/native';

type Item = {
    notification: NotificationItem[];
}
type NotificationItem = {
    id: any;
    type: any;
    postId: any;
    commentId: any;
    title: any;
    body: any;
    userInfo: {
        receiver: any;
        sender: any;
        fullname: any;
        avatar: any;
        mutiple: any;
    };
    reaction: {
        type: any;
    };
    timestamp: any;
};

const ItemComment: React.FC<ItemCommentProps> = ({ notification }) => {
    const navigation = useNavigation();

    const postId = notification.id;
    const displayDate = DateOfTimePost(notification.data[0].timestamp);

    const navigateToCommentsScreen = () => {
        navigation.navigate('CommentsScreen', { postId });
    };

    return (
        <TouchableOpacity style={styles.container} key={notification.idv4.toString()} onPress={navigateToCommentsScreen}>
            <View style={styles.iconFriend}>
                <Image style={styles.avatar} source={{ uri: notification.data[0].userInfo.avatar }} />
                {notification.data[1] ?
                    <Image style={styles.avatar1} source={{ uri: notification.data[1]?.userInfo.avatar }} />
                    :
                    null
                }
                {notification.data[2] ?
                    <Image style={styles.avatar2} source={{ uri: notification.data[2]?.userInfo.avatar }} />
                    :
                    null
                }
                {notification.data[3] ?
                    <Image style={styles.avatar3} source={{ uri: notification.data[3]?.userInfo.avatar }} />
                    :
                    null
                }

                <Icon style={styles.iconHeart} name="comment-bank" size={18} color={COLOR.PrimaryColor} />
            </View>
            <View style={styles.text}>
                <Text >
                    <Text style={styles.textUser_Post} numberOfLines={2} >{notification.data[0].userInfo.fullname}</Text>
                    {notification.data[1] ?
                        <Text style={styles.textUser_Post}>, {notification.data[1].userInfo.fullname}</Text>
                        :
                        null
                    }
                    {notification.data[2] ?
                        <Text style={styles.textUser_Post}>, ... </Text>
                        :
                        null
                    }
                    {notification.data[0].postId1 ?
                        <Text style={styles.textUser_Post}> đã trả lời bình luận </Text>
                        :
                        <Text style={styles.textUser_Post}> đã bình luận bài viết </Text>
                    }


                </Text>
                <Text style={styles.text1} numberOfLines={1} ellipsizeMode="tail">"{notification.data[0].body}"</Text>
            </View>
            <View style={styles.viewTime}>
                <Text style={styles.textTime}>{displayDate}</Text>
            </View>
        </TouchableOpacity>
    );
};
export default ItemComment

const styles = StyleSheet.create({
    container: {
        height: 54,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginTop: 5
    },
    iconFriend: {
        // height: 44,
        // width: 44,
        // borderWidth: 1,
        // borderColor: COLOR.PrimaryColor1,
        // borderRadius: 44,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 6,
        flex: 0.8
    },
    avatar: {
        height: 44,
        width: 44,
        borderRadius: 44,
        borderWidth: 1,
        borderColor: COLOR.PrimaryColor1,
        zIndex: 40
    },
    avatar1: {
        height: 22,
        width: 22,
        borderRadius: 44,
        borderWidth: 1,
        borderColor: COLOR.PrimaryColor1,
        position: 'absolute',
        start: 0, bottom: -2,
        zIndex: 50
    },
    avatar2: {
        height: 16,
        width: 16,
        borderRadius: 44,
        borderWidth: 1,
        borderColor: COLOR.PrimaryColor1,
        position: 'absolute',
        start: 10, bottom: -2,
        zIndex: 51
    },
    avatar3: {
        height: 14,
        width: 14,
        borderRadius: 44,
        borderWidth: 1,
        borderColor: COLOR.PrimaryColor1,
        position: 'absolute',
        start: 20, bottom: -2,
        zIndex: 52
    },
    iconHeart: {
        position: 'absolute',
        end: -6,
        bottom: -4,
        height: 20,
        width: 20,
        zIndex: 55
    },
    text: {
        marginStart: 10,
        flex: 5,
        flexDirection: 'column',
        overflow: 'hidden',
    },
    textUser_Post: {
        fontSize: 16,
        fontWeight: '600',
        fontStyle: "normal",
        color: 'black',

    },
    text1: {
        fontSize: 13,
        fontWeight: '400',
        fontStyle: "normal",
        color: 'black',
        marginEnd: 5
    },

    textTime: {
        fontSize: 9,
        fontWeight: '300',
        fontStyle: "normal",
        color: 'black',
        position: 'absolute',
        end: 5,
        bottom: 8
    },
    headerText: {
        fontSize: 18,
        fontWeight: '400',
        fontStyle: "normal",
        color: 'black',
        marginStart: 5
    },
    viewTime: {
        flex: 0.5,
        height: '100%'
    }
})
