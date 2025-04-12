import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../../config/colors';
import { Product } from '../../../models/Product';
import { LoadingIndicator } from '../../../components/LoadingModal/LoadingIndicator';
import ProductService from '../../../services/product/productApiResponse';

const AddProductScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const [product, setProduct] = useState<Partial<Product>>({
    title: '',
    description: '',
    content: '',
    category: '',
    price: 0,
    image: ''
  });

  const handleChange = (field: keyof Product, value: string | number) => {
    setProduct(prev => ({ ...prev, [field]: value }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      handleChange('image', result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!product.title || !product.price || !product.category) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await ProductService.createProduct(product as Product);
      if (response.success) {
        Alert.alert('Success', 'Product added successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', response.message || 'Failed to add product');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Product</Text>
        <View style={{ width: 24 }} /> {/* Spacer for alignment */}
      </View>

      <View style={styles.formContainer}>
        {/* Product Image */}
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Icon name="add-a-photo" size={40} color={colors.gray} />
              <Text style={styles.imagePlaceholderText}>Add Product Image</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Product Form */}
        <TextInput
          label="Product Title*"
          value={product.title}
          onChangeText={(text) => handleChange('title', text)}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="Description"
          value={product.description}
          onChangeText={(text) => handleChange('description', text)}
          style={styles.input}
          mode="outlined"
          multiline
          numberOfLines={3}
        />

        <TextInput
          label="Detailed Content"
          value={product.content}
          onChangeText={(text) => handleChange('content', text)}
          style={styles.input}
          mode="outlined"
          multiline
          numberOfLines={5}
        />

        <TextInput
          label="Category*"
          value={product.category}
          onChangeText={(text) => handleChange('category', text)}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="Price*"
          value={product.price?.toString()}
          onChangeText={(text) => handleChange('price', parseFloat(text) || 0)}
          style={styles.input}
          mode="outlined"
          keyboardType="numeric"
          left={<TextInput.Affix text="₹" />}
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
          labelStyle={styles.submitButtonText}
        >
          Add Product
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark,
  },
  formContainer: {
    padding: 16,
  },
  imagePicker: {
    marginBottom: 20,
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray,
    borderStyle: 'dashed',
  },
  imagePlaceholderText: {
    marginTop: 10,
    color: colors.gray,
  },
  input: {
    marginBottom: 16,
    backgroundColor: colors.white,
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 8,
    backgroundColor: colors.primary,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
  },
});

export default AddProductScreen;