import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import TopProfileBar from "../common/TopProfileBar";
import BottomNavigation from "../../components/BottomNavigation";

const AppSettings = ({ navigation }) => {
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(null); // To track which setting is being edited

  const handleSaveSettings = () => {
    // Logic to save settings (e.g., update user profile in the database)
    console.log(`Language: ${language}, Currency: ${currency}`);
    setModalVisible(false); // Close modal after saving
  };

  const openModal = (setting) => {
    setSelectedSetting(setting);
    setModalVisible(true);
  };

  const handleOptionSelect = (itemValue) => {
    if (selectedSetting === "language") {
      setLanguage(itemValue);
    } else if (selectedSetting === "currency") {
      setCurrency(itemValue);
    }
    setModalVisible(false); // Close modal after selection
  };

  return (
    <LinearGradient
      colors={["#1e1b4b", "#4a044e", "#3b0764"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <TopProfileBar navigation={navigation} />
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Ayarlar</Text>

          <View style={styles.formContent}>
            <View style={styles.settingOptionContainer}>
              <Text style={styles.label}>Dil:</Text>
              <TouchableOpacity
                style={styles.settingOption}
                onPress={() => openModal("language")}
              >
                <Text style={styles.label}>{language}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.settingOptionContainer}>
              <Text style={styles.label}>Para Birimi:</Text>
              <TouchableOpacity
                style={styles.settingOption}
                onPress={() => openModal("Currency")}
              >
                <Text style={styles.label}>{currency}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveSettings}
            >
              <Text style={styles.saveButtonText}>Ayarları Kaydet</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomNavigation navigation={navigation} pageName="AppSettings" />

      {/* Custom Modal for Picker */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={["#1e1b4b", "#4a044e"]}
            style={styles.modalContent}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.modalTitle}>
              Select {selectedSetting === "language" ? "Language" : "Currency"}
            </Text>
            <ScrollView style={styles.optionsContainer}>
              {selectedSetting === "language" ? (
                <>
                  <TouchableOpacity
                    onPress={() => handleOptionSelect("Turkish")}
                    style={styles.option}
                  >
                    <Text style={styles.optionText}>Türkçe</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleOptionSelect("English")}
                    style={styles.option}
                  >
                    <Text style={styles.optionText}>İngilizce</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleOptionSelect("Spanish")}
                    style={styles.option}
                  >
                    <Text style={styles.optionText}>İspanyolca</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleOptionSelect("French")}
                    style={styles.option}
                  >
                    <Text style={styles.optionText}>Fransızca</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleOptionSelect("German")}
                    style={styles.option}
                  >
                    <Text style={styles.optionText}>Almanca</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => handleOptionSelect("USD")}
                    style={styles.option}
                  >
                    <Text style={styles.optionText}>USD</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleOptionSelect("EUR")}
                    style={styles.option}
                  >
                    <Text style={styles.optionText}>EUR</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleOptionSelect("GBP")}
                    style={styles.option}
                  >
                    <Text style={styles.optionText}>GBP</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleOptionSelect("TRY")}
                    style={styles.option}
                  >
                    <Text style={styles.optionText}>TRY</Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>
    </LinearGradient>
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
  settingOption: {
    flex: 1,
    padding: 10,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    justifyContent: "center",
  },
  settingOptionContainer: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  label: {
    fontSize: 16,
    color: "#fff",
    width: 90,
  },
  saveButton: {
    backgroundColor: "rgba(244, 114, 182, 0.7)",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
    fontWeight: "bold",
  },
  optionsContainer: {
    maxHeight: 200, // Limit the height of the options container
    width: "100%",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderRadius: 10,
  },
  option: {
    padding: 10,
    marginHorizontal: 25,
    alignItems: "center",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderBottomWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
  },
  optionText: {
    fontSize: 18,
    color: "#fff",
  },
  closeButton: {
    width: "40%",
    marginTop: 20,
    backgroundColor: "rgba(244, 114, 182, 0.7)",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
});

export default AppSettings;
