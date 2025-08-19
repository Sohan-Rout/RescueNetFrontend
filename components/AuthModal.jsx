import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { supabase } from '../lib/supabaseClient';

export default function AuthModal({ visible, onClose }) {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    if (!displayName.trim()) {
      console.warn('Display Name is required');
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) {
      onClose?.();
      return;
    }
    if (
      error.status === 400 ||
      error.message?.toLowerCase().includes('invalid login credentials')
    ) {
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
      return;
    }
    // Any other error
    console.warn('Sign in error:', error.message);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View className="flex-1 bg-black/75 justify-center items-center">
        <View className="w-[90%] bg-neutral-900 rounded-2xl p-5">
          <Text className="text-white text-lg font-bold mb-4">
            Login / Signup
          </Text>

          <TextInput
            placeholder="Display Name"
            placeholderTextColor="#ccc"
            value={displayName}
            onChangeText={setDisplayName}
            className="bg-neutral-800 text-white p-3 rounded-xl mb-3"
          />

          <TextInput
            placeholder="Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="bg-neutral-800 text-white p-3 rounded-xl mb-3"
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="bg-neutral-800 text-white p-3 rounded-xl mb-3"
          />

          <TouchableOpacity
            onPress={handleAuth}
            className="bg-white p-3 rounded-xl mb-5 items-center"
          >
            <Text className="font-semibold">Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} className="mt-1 items-center">
            <Text className="text-neutral-400">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}