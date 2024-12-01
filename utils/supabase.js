import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iuwvsqajcrcurnegxqvc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1d3ZzcWFqY3JjdXJuZWd4cXZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2NzA3NzQsImV4cCI6MjA0ODI0Njc3NH0.izaYjh0QUDf7MSszGMT30cSyMANT8UOH9by7qe_rTGs'


export const supabase = createClient(supabaseUrl, supabaseAnonKey)
