import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const App = () => {
  const [data, setData] = useState([]); // State để lưu dữ liệu từ API
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading

  // Hàm fetchData để lấy dữ liệu từ MockAPI
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://66f606b5436827ced975b8c7.mockapi.io/products"
      );
      const json = await response.json();
      setData(json); // Cập nhật state với dữ liệu từ MockAPI
      setLoading(false); // Tắt trạng thái loading
    } catch (error) {
      console.error(error);
      setLoading(false); // Tắt trạng thái loading khi có lỗi
    }
  };

  useEffect(() => {
    fetchData(); // Gọi hàm fetchData khi component được render
  }, []);

  // Hiển thị loading khi dữ liệu chưa được tải về
  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#00A3E4" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {/* Thêm hình ảnh bên cạnh văn bản */}
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemShop}>{item.shop}</Text>
      </View>
      <TouchableOpacity style={styles.chatButton}>
        <Text style={styles.chatButtonText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.tabButton1}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Chat</Text>
        <TouchableOpacity style={styles.tabButton2}>
          <Icon name="cart-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Nội dung */}
      <FlatList
        data={data} // Sử dụng state data đã tải về
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        } // Sử dụng index nếu id không tồn tại
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false} // Tắt thanh cuộn dọc
      />

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.tabButton}>
          <Icon name="menu-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Icon name="home-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // Header style
  header: {
    height: 40,
    flexDirection: "row",
    backgroundColor: "#00A3E4",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  // Nội dung
  content: {
    paddingBottom: 60, // Để tránh nội dung bị trùng với footer
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemTextContainer: {
    flex: 1,
    marginLeft: 10, // Tạo khoảng cách giữa hình ảnh và văn bản
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemShop: {
    fontSize: 14,
    color: "grey",
  },
  chatButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  chatButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  // Footer style
  footer: {
    height: 40,
    backgroundColor: "#00A3E4",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingHorizontal: 20,
  },
  tabButton: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  tabButton1: {
    alignItems: "flex-start",
    margin: 10,
    flex: 1,
  },
  tabButton2: {
    alignItems: "flex-end",
    margin: 10,
    flex: 1,
  },
});

export default App;
