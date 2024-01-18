//react
import React, { useState } from "react";
//react-native
import {
  FlatList,
  Image,
  Keyboard,
  // KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from "react-native";
import uuid from "react-native-uuid";
//icon
import { Feather } from "@expo/vector-icons";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  incrementCommentCounter,
} from "../../redux/posts/postsSlice";
import { getAvatarImg } from "../../redux/auth/selectors";
import { getCommentsForPost } from "../../redux/posts/selectors";
//date
import moment from "moment";
import "moment/locale/uk";
import { ScrollView } from "react-native-gesture-handler";
import { updateCommentsInFirestore } from "../../firebase/service";

export const CommentsScreen = ({ route }) => {
  const { postId, post } = route.params;

  const [comment, setComment] = useState("");
  const [inputFocusState, setInputFocusState] = useState({
    comment: false,
  });
  const dispatch = useDispatch();
  const avatarImg = useSelector(getAvatarImg);
  const userComments = useSelector((state) =>
    getCommentsForPost(state, postId)
  );
  console.log("userComments", userComments);

  const handleAddComment = () => {
    const currentDate = moment().locale("uk").format("DD MMMM, YYYY | HH:mm");
    const newComment = {
      commentText: comment,
      date: currentDate,
      id: uuid.v4(),
    };
    if (newComment.commentText) {
      dispatch(addComment({ postId, newComment }));
      dispatch(incrementCommentCounter({ postId }));
      updateCommentsInFirestore(postId, newComment);
    }
    setComment("");
  };

  const handleInputOnFocus = (fieldName) => {
    setInputFocusState((prevState) => ({
      ...prevState,
      [fieldName]: true,
    }));
  };

  const handleInputOnBlur = (fieldName) => {
    setInputFocusState((prevState) => ({
      ...prevState,
      [fieldName]: false,
    }));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.contentContainer}>
        <View style={styles.photoContainer}>
          <Image
            source={{ uri: post.capturedImage }}
            style={styles.capturedImage}
          />
        </View>

        <ScrollView>
          {userComments &&
            userComments.map(({ commentText, date, id }) => {
              if (!commentText) {
                return null;
              }
              return (
                <View style={styles.userCommentContainer} key={id}>
                  <View style={styles.commentContainer}>
                    <Text style={styles.commentText}>{commentText}</Text>
                    <Text style={styles.commentData}>{date}</Text>
                  </View>
                  <View style={styles.avatarContainer}>
                    <Image
                      source={{ uri: avatarImg }}
                      style={styles.avatarImg}
                    />
                  </View>
                </View>
              );
            })}
        </ScrollView>
        <View>
          <TextInput
            style={
              inputFocusState.comment
                ? [styles.commentInput, styles.commentInputFocus]
                : styles.commentInput
            }
            onFocus={() => handleInputOnFocus("comment")}
            onBlur={() => handleInputOnBlur("comment")}
            onChangeText={setComment}
            value={comment}
            placeholder="Коментувати..."
          />
          <TouchableOpacity
            style={styles.commentBtn}
            onPress={handleAddComment}
          >
            <Feather name="arrow-up" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    width: Dimensions.get("window"),
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    backgroundColor: "#fff",
  },
  photoContainer: {
    width: 343,
    height: 240,
    marginBottom: 32,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
  },
  capturedImage: {
    flex: 1,
    borderRadius: 8,
  },
  commentsScroll: {
    flex: 1,
  },
  commentInput: {
    width: 343,
    height: 50,
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 100,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#BDBDBD",
  },
  commentInputFocus: {
    color: "#212121",
    borderColor: "#FF6C00",
    backgroundColor: "#fff",
  },
  commentBtn: {
    position: "absolute",
    top: 8,
    left: 301,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  userCommentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 343,
    marginBottom: 24,
  },
  commentContainer: {
    width: 299,
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#rgba(0,0,0,0.03)",
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
  },
  commentText: {
    fontSize: 13,
    color: "#212121",
  },
  commentData: { fontSize: 10, color: "#BDBDBD", textAlign: "right" },
  avatarContainer: { width: 28, height: 28, borderRadius: 100 },
  avatarImg: { flex: 1, borderRadius: 100 },
});
