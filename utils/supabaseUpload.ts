// utils/supabaseUpload.ts
import { supabase } from './supabaseClient';

export async function uploadToSupabase(bucket: string, file: File) {
  // Convert the file to a buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { data, error } = await supabase.storage.from(bucket).upload(file.name, buffer, {
    contentType: file.type,
    cacheControl: '3600',
    upsert: true,
  });

  if (error) throw error;

  // Generate the public URL
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(file.name);
  const publicURL = urlData?.publicUrl;

  return { ...data, publicURL };
}