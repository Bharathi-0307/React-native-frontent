import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Calendar } from 'react-native-calendars';
import { Dropdown } from 'react-native-element-dropdown';
import { Product } from '../../models/Product';
import CustomerService from '../../services/customer/CustomerService';
import { LoadingIndicator } from '../../components/LoadingModal/LoadingIndicator';
import { colors } from '../../config/colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const PLANS = {
  '1M': { price: 4000, duration: '1 Month' },
  '3M': { price: 12000, duration: '3 Months' },
  '6M': { price: 24000, duration: '6 Months' },
  '12M': { price: 48000, duration: '12 Months' }
};

const CustomerDashboardScreen = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [dropdownItems, setDropdownItems] = useState<Array<{label: string, value: string}>>([]);
  const [students, setStudents] = useState([{ id: '1', name: 'Student 1' }]); // Mock students
  const [selectedStudent, setSelectedStudent] = useState('1');
  const [plan, setPlan] = useState('1M');
  const [calendarData, setCalendarData] = useState({});

  useEffect(() => {
    fetchProducts();
    fetchCalendarData();
  }, []);

  useEffect(() => {
    setDropdownItems(products.map(product => ({
      label: `${product.title} - ₹${product.price}`,
      value: product.id
    })));
  }, [products]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await CustomerService.getAvailableProducts();
  
      setProducts(response); 
      console.log(response);
  
    } catch (error) {
      Alert.alert('Error', 'Network error occurred');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  const fetchCalendarData = async () => {
    try {
      const response = await CustomerService.getCalendarSelections();
      if (response.success) {
        // Format data for calendar marking
        const markedDates = {};
        response.data.forEach(entry => {
          markedDates[entry.date] = {
            selected: true,
            selectedColor: entry.studentId === '1' ? colors.primary : colors.secondary,
            dotColor: entry.studentId === '1' ? colors.primary : colors.secondary
          };
        });
        setCalendarData(markedDates);
      }
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    }
  };

  const handleDateSelect = (day: {dateString: string}) => {
    setSelectedDate(day.dateString);
    setSelectedProduct(null);
  };

  const handleSaveSelection = async () => {
    if (!selectedProduct) {
      Alert.alert('Error', 'Please select a product first');
      return;
    }

    try {
      const response = await CustomerService.saveMenuSelection({
        date: selectedDate,
        productId: selectedProduct,
        studentId: selectedStudent
      });
      
      if (response.success) {
        Alert.alert('Success', 'Menu selection saved successfully');
        fetchCalendarData();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save selection');
    }
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={[
        styles.productCard,
        selectedProduct === item.id && styles.selectedProductCard
      ]}
      onPress={() => setSelectedProduct(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>₹{item.price.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Plan Information */}
      <View style={styles.planContainer}>
        <Text style={styles.planText}>Current Plan: {PLANS[plan].duration}</Text>
        <Text style={styles.planText}>Price: ₹{PLANS[plan].price}</Text>
      </View>

      {/* Student Selection */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Select Student</Text>
        <Dropdown
          data={students.map(s => ({ label: s.name, value: s.id }))}
          labelField="label"
          valueField="value"
          value={selectedStudent}
          onChange={item => setSelectedStudent(item.value)}
          style={styles.dropdown}
        />
      </View>

      {/* Calendar Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Select Date</Text>
        <Calendar
          current={selectedDate}
          onDayPress={handleDateSelect}
          markedDates={{
            ...calendarData,
            [selectedDate]: { 
              selected: true, 
              selectedColor: colors.background,
              dotColor: colors.background
            }
          }}
          theme={{
            selectedDayBackgroundColor: colors.primary,
            todayTextColor: colors.primary,
            arrowColor: colors.primary,
          }}
        />
      </View>

      {/* Product Selection */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Menu for {selectedDate}</Text>
        <Dropdown
          style={styles.dropdown}
          data={dropdownItems}
          labelField="label"
          valueField="value"
          placeholder="Select menu item"
          value={selectedProduct}
          onChange={item => setSelectedProduct(item.value)}
        />
        
        <TouchableOpacity 
          style={[styles.saveButton, !selectedProduct && styles.saveButtonDisabled]}
          onPress={handleSaveSelection}
          disabled={!selectedProduct}
        >
          <Text style={styles.saveButtonText}>Save Selection</Text>
        </TouchableOpacity>
      </View>

      {/* Product Listing */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Products</Text>
          <TouchableOpacity onPress={fetchProducts}>
            <Icon name="refresh" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productList}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: wp(4), // ~16px on standard screens
  },
  planContainer: {
    backgroundColor: colors.white,
    borderRadius: wp(2), // ~8px
    padding: wp(4),
    marginBottom: hp(2), // ~16px
    elevation: 2,
  },
  planText: {
    fontSize: wp(4), // ~16px
    color: colors.dark,
    marginBottom: hp(0.5), // ~4px
  },
  sectionContainer: {
    backgroundColor: colors.white,
    borderRadius: wp(2),
    padding: wp(4),
    marginBottom: hp(2),
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.5), // ~12px
  },
  sectionTitle: {
    fontSize: wp(4.5), // ~18px
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: hp(1.5),
  },
  dropdown: {
    height: hp(6), // ~50px
    borderColor: colors.lightGray,
    borderWidth: 1,
    borderRadius: wp(2),
    paddingHorizontal: wp(3), // ~12px
    marginBottom: hp(2),
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: hp(1.5),
    borderRadius: wp(2),
    alignItems: 'center',
    opacity: 1,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: wp(4),
  },
  productList: {
    paddingBottom: hp(1), // ~8px
  },
  productCard: {
    width: wp(40), // ~160px on standard screens
    backgroundColor: colors.white,
    borderRadius: wp(2),
    marginRight: wp(3),
    padding: wp(3),
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  selectedProductCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  productImage: {
    width: '100%',
    height: hp(12.5), // ~100px
    borderRadius: wp(1), // ~4px
    marginBottom: hp(1),
    backgroundColor: colors.lightGray,
  },
  productInfo: {
    paddingHorizontal: wp(1),
  },
  productTitle: {
    fontSize: wp(3.5), // ~14px
    fontWeight: 'bold',
    marginBottom: hp(0.5),
  },
  productPrice: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: hp(0.5),
  },
  productCategory: {
    fontSize: wp(3), // ~12px
    color: colors.gray,
  },
});


export default CustomerDashboardScreen;