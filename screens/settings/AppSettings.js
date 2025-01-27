import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAsync, userUpdateAsync } from "../../database/redux/slices/userSlice";
import { Ionicons } from "@expo/vector-icons";
import EditModal from "../../components/EditModal";
import Loading from "../common/Loading";
import ScreenWrapper from "../../components/ScreenWrapper";
import { appSettingsFields } from "../../constants/ComponentConfigs";


const AppSettingsTouchableOpacity = ({user, openModal, field_name, field_title}) => {
  if (!user) return null;
  
  return (
    <TouchableOpacity style={styles.option}
      onPress={() => openModal(field_name, user[field_name])}
    >
      <Text style={styles.optionText}>{field_title}: {user[field_name] || "Not set"}</Text>
      <Ionicons name="chevron-forward" size={24} color="rgba(255, 255, 255, 0.5)" />
    </TouchableOpacity>
  )
}


const AppSettings = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.isLoading);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [editValue, setEditValue] = useState('');
  
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await dispatch(getUserAsync(userUid));
    }

    if (user === null) {
      fetchUserDetails();
    }
  }, []);

  const updateUser = async (field, value) => {
    await dispatch(userUpdateAsync({...user, [field]: value }));
    setIsModalVisible(false);
  }

  const openModal = (field) => {
    setActiveField(field);
    setIsModalVisible(true);
  };

  return (
    <ScreenWrapper navigation={navigation} pageName="AppSettings">
      {isLoading && <Loading />}
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Genel Ayarlar</Text>

          <View style={styles.formContent}>
            {user && (
              <>
                <AppSettingsTouchableOpacity
                  user={user}
                  openModal={openModal}
                  field_name="language"
                  field_title="Dil"
            />
            <AppSettingsTouchableOpacity
                  user={user}
                  openModal={openModal}
                  field_name="currency"
                  field_title="Para Birimi"
                />
              </>
            )}
          </View>
        </ScrollView>
        <EditModal
          isVisible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
          activeField={activeField}
          fieldConfigs={appSettingsFields}
          editValue={editValue}
          setEditValue={setEditValue}
          onUpdate={updateUser}
        />
      </SafeAreaView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  option: {
    flexDirection: "row",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    color: "#fff",
  },
  formContent: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    marginBottom: 24,
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: -5,
    left: 0,
    zIndex: 1,
    padding: 8,
  },
});

export default AppSettings;
