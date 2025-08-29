import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { supabase } from '../lib/supabaseClient';

export default function AuthModal({ visible, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    if (isLogin) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.warn('Sign in error:', error.message);
        return;
      }
      onClose?.();
    } else {
      if (!displayName.trim()) {
        console.warn('Display Name is required');
        return;
      }
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { displayName },
          emailRedirectTo: "sahayak://auth/callback",
        },
      });
      if (signUpError) {
        console.warn('Sign up error:', signUpError.message);
        return;
      }
      onClose?.();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View className="flex-1 bg-neutral-100 justify-center items-center">
        <View className="w-[90%] bg-white border border-neutral-300 rounded-2xl p-5">
          <View className="flex items-center">
          <Text className="text-black text-xl font-bold mb-6">
            {isLogin ? 'Login' : 'Signup'}
          </Text>
          </View>

          {!isLogin && (
            <TextInput
              placeholder="Legal Name"
              placeholderTextColor="black"
              value={displayName}
              onChangeText={setDisplayName}
              className="bg-white text-black border border-neutral-300 p-3 rounded-xl mb-3"
            />
          )}

          <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="bg-white text-black border border-neutral-300 p-3 rounded-xl mb-3"
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="bg-white text-black border border-neutral-300 p-3 rounded-xl mb-3"
          />

          <TouchableOpacity
            onPress={handleAuth}
            className="bg- py-3 rounded-full mt-5 items-center"
          >
            <Text className="font-semibold text-white">Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsLogin(!isLogin)} className="mt-5 items-center">
            <Text className="text-blue-600">
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}