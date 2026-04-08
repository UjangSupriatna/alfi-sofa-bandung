"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Shield,
  Ruler,
  Award,
  Truck,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  MessageCircle,
  Menu,
  ChevronUp,
  ArrowLeft,
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Package,
  ShoppingBag,
} from "lucide-react";

/* ──────────────────────────────────── types ──────────────────────────────────── */

type Product = {
  id: number;
  name: string;
  slug: string;
  image: string;
  images: string[];
  description: string;
  longDescription: string;
  price: string;
  originalPrice?: string;
  priceMin: number;
  priceMax: number;
  category: string;
  material: string;
  dimensions: string;
  featured: boolean;
  rating: number;
  sold: number;
};

type ViewMode = "home" | "products";

/* ──────────────────────────────────── data ──────────────────────────────────── */

const NAV_LINKS = [
  { label: "Beranda", href: "#beranda", view: "home" as ViewMode },
  { label: "Tentang Kami", href: "#tentang", view: "home" as ViewMode },
  { label: "Produk", href: "#produk", view: "products" as ViewMode },
  { label: "Keunggulan", href: "#keunggulan", view: "home" as ViewMode },
  { label: "Testimoni", href: "#testimoni", view: "home" as ViewMode },
  { label: "Kontak", href: "#kontak", view: "home" as ViewMode },
];

const STATS = [
  { value: "5000+", label: "Pelanggan Puas" },
  { value: "50+", label: "Desain Sofa" },
  { value: "100%", label: "Garansi" },
];

const CATEGORIES = [
  "Semua",
  "Sofa Sudut",
  "Sofa Dudukan",
  "Armchair",
  "Sofa Bed",
  "Set Sofa",
];

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Sofa Minimalis Yura Simple",
    slug: "sofa-minimalis-yura-simple",
    image: "/images/products/yura/1.jpg",
    images: [
      "/images/products/yura/1.jpg",
      "/images/products/yura/2.jpg",
      "/images/products/yura/3.jpg",
      "/images/products/yura/4.jpg",
      "/images/products/yura/5.jpg",
      "/images/products/yura/6.jpg",
    ],
    description: "Sofa minimalis elegan berbentuk melengkung dengan free 3 bantal furniture",
    longDescription:
      "Sofa Minimalis Yura Simple hadir dengan desain melengkung elegan yang cocok untuk ruang tamu minimalis. Dilengkapi free 3 bantal furniture dengan aksen emas metalik yang memberikan sentuhan mewah. Ukuran 210 x 90 cm. Tersedia bahan Bludru, Kanvas, dan Oscar dengan berbagai pilihan warna. Ukuran bisa request sesuai ruang tamu Anda. Gratis ongkir Jabodetabek.",
    price: "Rp 3.350.000 - Rp 3.950.000",
    priceMin: 3350000,
    priceMax: 3950000,
    category: "Sofa Dudukan",
    material: "Bludru / Kanvas / Oscar, Foam, Kayu Solid",
    dimensions: "210 cm x 90 cm",
    featured: true,
    rating: 4.9,
    sold: 30,
  },
  {
    id: 2,
    name: "Sofa Marbella",
    slug: "sofa-marbella",
    image: "/products/marbella/1.jpg",
    images: [
      "/products/marbella/1.jpg",
      "/products/marbella/2.jpg",
      "/products/marbella/3.jpg",
      "/products/marbella/4.jpg",
      "/products/marbella/5.jpg",
      "/products/marbella/6.jpg",
    ],
    description: "Sofa Marbella trend viral TikTok, desain minimalis modern. Free 5 bantal furniture",
    longDescription:
      "Sofa Marbella hadir dengan desain minimalis modern yang sedang viral di TikTok. Ukuran panjang 243 cm, lebar 95 cm, tinggi 70 cm. Free 5 bantal (3 besar + 2 kecil). Tersedia banyak pilihan warna kain dan meja (bisa request). Ready bahan Bludru, Kanvas, dan Oscar. Khusus pengiriman Jabodetabek.",
    price: "Rp 5.328.000 - Rp 6.200.000",
    priceMin: 5328000,
    priceMax: 6200000,
    category: "Sofa Dudukan",
    material: "Bludru / Kanvas / Oscar, Foam, Kayu Solid",
    dimensions: "Panjang 243 cm x Lebar 95 cm x Tinggi 70 cm",
    featured: true,
    rating: 4.8,
    sold: 45,
  },
  {
    id: 3,
    name: "Sofa Velos 3 Seater Tipe 2",
    slug: "sofa-velos-3-seater",
    image: "/products/veloz3seater/1.jpg",
    images: [
      "/products/veloz3seater/1.jpg",
      "/products/veloz3seater/2.jpg",
      "/products/veloz3seater/3.jpg",
      "/products/veloz3seater/4.jpg",
      "/products/veloz3seater/5.jpg",
      "/products/veloz3seater/6.jpg",
      "/products/veloz3seater/7.jpg",
    ],
    description: "Sofa Velos modern jumbo 3 seater. Free 3 bantal. Bisa request warna & motif",
    longDescription:
      "Sofa Velos 3 Seater Tipe 2 hadir dengan desain modern jumbo yang nyaman. Ukuran panjang 210 cm, lebar 85 cm, tinggi 75 cm. Free 3 bantal furniture. Tersedia banyak pilihan warna kain dan meja (bisa request). Ready bahan Bludru, Vegas, Midili, Kanvas, dan Oscar. Ready semua warna. Tanyakan dulu untuk motif dan ketersediaan.",
    price: "Rp 3.960.000 - Rp 4.800.000",
    priceMin: 3960000,
    priceMax: 4800000,
    category: "Sofa Dudukan",
    material: "Bludru / Vegas / Midili / Kanvas / Oscar, Foam, Kayu Solid",
    dimensions: "Panjang 210 cm x Lebar 85 cm x Tinggi 75 cm",
    featured: true,
    rating: 4.8,
    sold: 38,
  },
  {
    id: 4,
    name: "Sofa Retro L Putus",
    slug: "sofa-retro-l-putus",
    image: "/products/retroL/1.jpg",
    images: [
      "/products/retroL/1.jpg",
      "/products/retroL/2.jpg",
      "/products/retroL/3.jpg",
      "/products/retroL/4.jpg",
      "/products/retroL/5.jpg",
      "/products/retroL/6.jpg",
      "/products/retroL/7.jpg",
    ],
    description: "Sofa minimalis retro L putus 3 seater free bantal, bahan premium berkualitas",
    longDescription:
      "Memiliki ruang minimalis bukan berarti tidak dapat menikmati kenyamanan maksimal. Sofa minimalis retro L putus ini memiliki dudukan yang didesain khusus untuk menambah kenyamanan Anda, serta menambah keindahan dekorasi ruang yang didesain khusus dengan bahan premium berkualitas menengah ke atas. Dilengkapi free bantal furniture.",
    price: "Rp 3.390.000 - Rp 4.200.000",
    priceMin: 3390000,
    priceMax: 4200000,
    category: "Sofa Sudut",
    material: "Busa Royal Foam, Kayu Albasiah, Kain Bludru, Kaki Retro",
    dimensions: "Tersedia beberapa ukuran (bisa request)",
    featured: true,
    rating: 4.9,
    sold: 60,
  },
  {
    id: 5,
    name: "Sofa Veloz dan Yossi",
    slug: "sofa-veloz-yossi",
    image: "/products/velozyossi/1.jpg",
    images: [
      "/products/velozyossi/1.jpg",
      "/products/velozyossi/2.jpg",
      "/products/velozyossi/3.jpg",
      "/products/velozyossi/4.jpg",
      "/products/velozyossi/5.jpg",
      "/products/velozyossi/6.jpg",
      "/products/velozyossi/7.jpg",
      "/products/velozyossi/8.jpg",
    ],
    description: "Set sofa Veloz dan Yossi, desain modern minimalis dengan kualitas premium",
    longDescription:
      "Set Sofa Veloz dan Yossi hadir dengan desain modern minimalis yang elegan. Sofa 3 seater dengan proporsi seimbang, dilengkapi bantal dekoratif yang melengkapi tampilan. Material velvet halus dan berkilau dengan busa empuk untuk kenyamanan maksimal. Cocok untuk ruang tamu yang menginginkan tampilan modern dan mewah.",
    price: "Rp 480.000 - Rp 500.000",
    priceMin: 480000,
    priceMax: 500000,
    category: "Set Sofa",
    material: "Velvet, Foam, Kayu Solid, Kaki Logam Gold",
    dimensions: "Ukuran sofa 210 cm",
    featured: false,
    rating: 4.7,
    sold: 85,
  },
  {
    id: 6,
    name: "Sofa Tidur / Sofa Lipat",
    slug: "sofa-tidur-sofa-lipat",
    image: "/products/sofatidur/1.jpg",
    images: [
      "/products/sofatidur/1.jpg",
      "/products/sofatidur/2.jpg",
      "/products/sofatidur/3.jpg",
      "/products/sofatidur/4.jpg",
      "/products/sofatidur/5.jpg",
      "/products/sofatidur/6.jpg",
      "/products/sofatidur/7.jpg",
      "/products/sofatidur/8.jpg",
      "/products/sofatidur/9.jpg",
    ],
    description: "Sofa bed double reklening, bisa diubah menjadi tempat tidur. Bahan bludru premium",
    longDescription:
      "Memiliki ruang minimalis bukan berarti tidak dapat menikmati kenyamanan maksimal. Dengan Sofa Tidur, Anda bisa merasakan kenyamanan bersantai di sofa sekaligus tempat tidur. Bentuk sofa yang fungsional bisa diubah menjadi single bed / tempat tidur, dengan hanya merebahkan bagian sandaran belakangnya. Dilengkapi extra bonus bantal.",
    price: "Rp 2.280.000 - Rp 3.000.000",
    priceMin: 2280000,
    priceMax: 3000000,
    category: "Sofa Bed",
    material: "Silicon, Kayu Albasiah, Kain Bludru, Kaki Plastik 8 cm",
    dimensions: "Duduk: 170 x 85 x 100 cm | Rebah: 170 x 125 x 50 cm",
    featured: true,
    rating: 4.8,
    sold: 120,
  },
  {
    id: 7,
    name: "Sofa Bed Pillow Top",
    slug: "sofa-bed-pillow-top",
    image: "/products/sofabedPillow/1.jpg",
    images: [
      "/products/sofabedPillow/1.jpg",
      "/products/sofabedPillow/2.jpg",
      "/products/sofabedPillow/3.jpg",
      "/products/sofabedPillow/4.jpg",
      "/products/sofabedPillow/5.jpg",
      "/products/sofabedPillow/6.jpg",
    ],
    description: "Sofa bed pillow top minimalis warna abu tua, bisa diubah menjadi tempat tidur",
    longDescription:
      "Sofa Bed Pillow Top hadir dengan desain minimalis modern warna abu tua. Bentuk sofa yang fungsional bisa diubah menjadi single bed / tempat tidur, dengan hanya merebahkan bagian sandaran belakangnya. Material Silicon empuk dengan kain Bludru premium untuk kenyamanan maksimal.",
    price: "Rp 1.900.000 - Rp 2.400.000",
    priceMin: 1900000,
    priceMax: 2400000,
    category: "Sofa Bed",
    material: "Silicon, Kayu Albasiah, Kain Bludru, Kaki Plastik 8 cm",
    dimensions: "Duduk: 170 x 85 x 100 cm | Rebah: 170 x 125 x 50 cm",
    featured: false,
    rating: 4.7,
    sold: 95,
  },
  {
    id: 8,
    name: "Sofa 3 Seater Warna Hitam",
    slug: "sofa-3-seater-hitam",
    image: "/products/sofa3seaterHitam/1.jpg",
    images: [
      "/products/sofa3seaterHitam/1.jpg",
      "/products/sofa3seaterHitam/2.jpg",
      "/products/sofa3seaterHitam/3.jpg",
      "/products/sofa3seaterHitam/4.jpg",
      "/products/sofa3seaterHitam/5.jpg",
      "/products/sofa3seaterHitam/6.jpg",
    ],
    description: "Sofa minimalis 3 seater warna hitam, bahan premium berkualitas tinggi",
    longDescription:
      "Sofa Minimalis 3 Seater Warna Hitam hadir dengan dudukan yang didesain khusus untuk menambah kenyamanan Anda, serta menambah keindahan dekorasi ruang. Desain khusus dengan bahan premium berkualitas menengah ke atas. Warna hitam elegan cocok untuk berbagai tema interior.",
    price: "Rp 3.390.000 - Rp 4.200.000",
    priceMin: 3390000,
    priceMax: 4200000,
    category: "Sofa Dudukan",
    material: "Busa Royal Foam, Kayu Albasiah, Kain Bludru, Kaki Plastik",
    dimensions: "Tersedia beberapa ukuran (bisa request)",
    featured: true,
    rating: 4.8,
    sold: 55,
  },
  {
    id: 9,
    name: "Sofa Yossi Minimalis 3 Siter",
    slug: "sofa-yossi-3-siter",
    image: "/products/sofaYossi3siter/1.jpg",
    images: [
      "/products/sofaYossi3siter/1.jpg",
      "/products/sofaYossi3siter/2.jpg",
      "/products/sofaYossi3siter/3.jpg",
      "/products/sofaYossi3siter/4.jpg",
      "/products/sofaYossi3siter/5.jpg",
      "/products/sofaYossi3siter/6.jpg",
      "/products/sofaYossi3siter/7.jpg",
      "/products/sofaYossi3siter/8.jpg",
      "/products/sofaYossi3siter/9.jpg",
      "/products/sofaYossi3siter/10.jpg",
      "/products/sofaYossi3siter/11.jpg",
    ],
    description: "Sofa Yossi minimalis modern 3 siter tanpa meja, free 3 bantal",
    longDescription:
      "Sofa Yossi Minimalis 3 Siter hadir dengan desain modern dan cantik untuk ruang tamu. Ukuran panjang 210 x lebar 80 cm, tinggi 75 cm. Free 3 bantal. Tersedia banyak pilihan warna kain dan meja (bisa request). Ready bahan Bludru, Vegas, Midili, Kanvas, dan Oscar. Ukuran bisa request sesuai ruang tamu Anda.",
    price: "Rp 2.500.000 - Rp 3.000.000",
    priceMin: 2500000,
    priceMax: 3000000,
    category: "Sofa Dudukan",
    material: "Bludru / Vegas / Midili / Kanvas / Oscar, Foam, Kayu Solid",
    dimensions: "Panjang 210 cm x Lebar 80 cm x Tinggi 75 cm",
    featured: false,
    rating: 4.7,
    sold: 70,
  },
  {
    id: 10,
    name: "Sofa Minimalis Storage Slonjor",
    slug: "sofa-minimalis-storage-slonjor",
    image: "/products/sofaStorageSlonjor/1.jpg",
    images: [
      "/products/sofaStorageSlonjor/1.jpg",
      "/products/sofaStorageSlonjor/2.jpg",
      "/products/sofaStorageSlonjor/3.jpg",
      "/products/sofaStorageSlonjor/4.jpg",
      "/products/sofaStorageSlonjor/5.jpg",
      "/products/sofaStorageSlonjor/6.jpg",
      "/products/sofaStorageSlonjor/7.jpg",
      "/products/sofaStorageSlonjor/8.jpg",
    ],
    description: "Sofa minimalis storage slonjor, bisa request warna, bahan, dan ukuran",
    longDescription:
      "Sofa Minimalis Storage Slonjor hadir dengan fitur penyimpanan multifungsi. Ukuran 220 x slonjor 170 cm. Free bantal. Tersedia banyak pilihan warna kain dan meja (bisa request). Ready bahan Bludru, Kanvas, dan Oscar. Ukuran bisa request sesuai ruang tamu Anda.",
    price: "Rp 6.600.000 - Rp 7.600.000",
    priceMin: 6600000,
    priceMax: 7600000,
    category: "Sofa Sudut",
    material: "Bludru / Kanvas / Oscar, Foam, Kayu Solid",
    dimensions: "220 cm x Slonjor 170 cm (bisa request ukuran)",
    featured: true,
    rating: 4.9,
    sold: 35,
  },
  {
    id: 11,
    name: "Sofa New Force Formasi 321 + Meja",
    slug: "sofa-new-force-321",
    image: "/products/sofaNewForce321/1.jpg",
    images: [
      "/products/sofaNewForce321/1.jpg",
      "/products/sofaNewForce321/2.jpg",
      "/products/sofaNewForce321/3.jpg",
      "/products/sofaNewForce321/4.jpg",
      "/products/sofaNewForce321/5.jpg",
      "/products/sofaNewForce321/6.jpg",
      "/products/sofaNewForce321/7.jpg",
      "/products/sofaNewForce321/8.jpg",
    ],
    description: "Set sofa New Force formasi 321 + meja, desain mewah besar premium",
    longDescription:
      "Sofa New Force Formasi 321 + Meja hadir dengan model mewah besar. Set lengkap formasi 321 (3 seater, 2 seater, 1 seater) ditambah meja. Desain mewah yang menambah sensasi kenikmatan duduk dengan santai. Material Silicon premium dengan kain Bludru dan kaki Stainles. Cocok untuk ruang tamu besar yang menginginkan kemewahan maksimal.",
    price: "Rp 10.000.000 - Rp 11.000.000",
    priceMin: 10000000,
    priceMax: 11000000,
    category: "Set Sofa",
    material: "Silicon, Kayu Albasiah, Kain Bludru, Kaki Stainles",
    dimensions: "3 Seater: 210x100x110 cm | 2 Seater: 140x100x110 cm | 1 Seater: 110x100x110 cm | Meja: 100x60x40 cm",
    featured: true,
    rating: 4.9,
    sold: 20,
  },
  {
    id: 12,
    name: "Sofa Lombok Minimalis",
    slug: "sofa-lombok-minimalis",
    image: "/products/sofaLombok/1.jpg",
    images: [
      "/products/sofaLombok/1.jpg",
    ],
    description: "Sofa Lombok minimalis tanpa meja, bisa custom ukuran, warna, dan bahan sesuai kebutuhan",
    longDescription:
      "Sofa Lombok Minimalis hadir dengan desain elegan tanpa meja. Bisa custom ukuran, warna, dan bahan sesuai kebutuhan ruang tamu Anda. Tersedia bahan Bludru, Kanvas, dan Oscar dengan berbagai pilihan warna. Material Silicon empuk dengan busa berkualitas tinggi memberikan kenyamanan maksimal. Cocok untuk ruang tamu minimalis maupun modern. Gratis ongkir se-Bandung Raya.",
    price: "Rp 4.300.000 - Rp 5.200.000",
    priceMin: 4300000,
    priceMax: 5200000,
    category: "Sofa Dudukan",
    material: "Bludru / Kanvas / Oscar, Silicon, Kayu Solid",
    dimensions: "Tersedia beberapa ukuran (bisa request sesuai ruang tamu)",
    featured: true,
    rating: 4.8,
    sold: 40,
  },
  {
    id: 13,
    name: "Sofa Bubble Slonjor",
    slug: "sofa-bubble-slonjor",
    image: "/products/sofaBubbleSlonjor/1.jpg",
    images: [
      "/products/sofaBubbleSlonjor/1.jpg",
      "/products/sofaBubbleSlonjor/2.jpg",
    ],
    description: "Sofa bubble slonjor santai gemoy design minimalis, bisa custom ukuran dan warna",
    longDescription:
      "Sofa Buble Slonjor Santai Sofa Gemoy hadir dengan design minimalis modern full silikon empuk. Material Silicon premium yang sangat nyaman untuk duduk dalam waktu lama. Desain slonjor panjang cocok untuk ruang tamu yang luas. Bisa custom ukuran dan warna sesuai kebutuhan. Tersedia banyak pilihan warna kain.",
    price: "Rp 5.000.000 - Rp 6.000.000",
    priceMin: 5000000,
    priceMax: 6000000,
    category: "Sofa Dudukan",
    material: "Silicon, Kayu Albasiah, Kain Bludru / Kanvas / Oscar",
    dimensions: "Tersedia beberapa ukuran (bisa request)",
    featured: true,
    rating: 4.8,
    sold: 32,
  },
  {
    id: 14,
    name: "Sofa Kancing 1000",
    slug: "sofa-kancing-1000",
    image: "/products/sofaKancing1000/1.jpg",
    images: [
      "/products/sofaKancing1000/1.jpg",
      "/products/sofaKancing1000/2.jpg",
      "/products/sofaKancing1000/3.jpg",
      "/products/sofaKancing1000/4.jpg",
    ],
    description: "Sofa mewah sultan kancing 1000 kursi ratu, kursi tamu mewah bergaransi",
    longDescription:
      "Sofa Mewah Sultan Kancing 1000 Kursi Ratu hadir dengan desain mewah premium bergaya singgasana raja dan ratu. Jadikan ruang tamu Anda bersuasana singgasana raja dan ratu. Material busa Royal Foam dengan kain Bludru premium dan kayu Albasiah berkualitas. Detail kancing 1000 memberikan tampilan elegan dan mewah.",
    price: "Rp 8.600.000 - Rp 9.600.000",
    priceMin: 8600000,
    priceMax: 9600000,
    category: "Set Sofa",
    material: "Busa Royal Foam, Kayu Albasiah, Kain Bludru, Kaki Plastik",
    dimensions: "3 Seater: P 210 x L 90 x T 90 cm | 1 Seater: P 100 x L 90 x T 120 cm | Stool: P 120 x L 45 x T 50 cm",
    featured: true,
    rating: 4.9,
    sold: 18,
  },
  {
    id: 15,
    name: "Sofa Ruang Tamu Elegan Force Custom",
    slug: "sofa-force-custom",
    image: "/products/sofaForceCustom/1.jpg",
    images: [
      "/products/sofaForceCustom/1.jpg",
      "/products/sofaForceCustom/2.jpg",
      "/products/sofaForceCustom/3.jpg",
      "/products/sofaForceCustom/4.jpg",
    ],
    description: "Sofa Force mewah sultan harga rakyat, bisa custom ukuran dan warna",
    longDescription:
      "Sofa Force Mewah Sultan Harga Rakyat hadir dengan desain modern mewah. Material Silicon super empuk memberikan kenyamanan maksimal saat duduk. Bisa custom ukuran dan warna sesuai kebutuhan ruangan Anda. Kain Bludru berkualitas dengan kayu Albasiah solid dan kaki Stainles premium.",
    price: "Rp 8.000.000 - Rp 9.200.000",
    priceMin: 8000000,
    priceMax: 9200000,
    category: "Set Sofa",
    material: "Silicon, Kayu Albasiah, Kain Bludru, Kaki Stainles",
    dimensions: "1 Seater: 100x90x100 cm | 2 Seater: 140x90x100 cm | 3 Seater: 200x90x100 cm | Meja: 100x60x40 cm",
    featured: true,
    rating: 4.8,
    sold: 25,
  },
  {
    id: 16,
    name: "Sofa Bubble Marbella Sudut",
    slug: "sofa-bubble-marbella-sudut",
    image: "/products/sofaBubbleMarbellaSudut/1.jpg",
    images: [
      "/products/sofaBubbleMarbellaSudut/1.jpg",
      "/products/sofaBubbleMarbellaSudut/2.jpg",
      "/products/sofaBubbleMarbellaSudut/3.jpg",
      "/products/sofaBubbleMarbellaSudut/4.jpg",
      "/products/sofaBubbleMarbellaSudut/5.jpg",
      "/products/sofaBubbleMarbellaSudut/6.jpg",
    ],
    description: "Sofa sudut minimalis terbaru, cocok di ruang tamu, bisa custom ukuran dan warna",
    longDescription:
      "Sofa Sudut Minimalis Terbaru hadir dengan design modern cocok di ruang tamu. Material Silicon empuk memberikan kenyamanan luar biasa. Desain sudut yang efisien untuk memaksimalkan ruang tamu. Tersedia banyak pilihan warna kain (bisa request). Ready bahan Bludru, Kanvas, dan Oscar.",
    price: "Rp 5.900.000 - Rp 6.800.000",
    priceMin: 5900000,
    priceMax: 6800000,
    category: "Sofa Sudut",
    material: "Silicon, Kayu Albasiah, Kain Bludru / Kanvas / Oscar",
    dimensions: "Sudut L (bisa request ukuran sesuai ruang tamu)",
    featured: true,
    rating: 4.9,
    sold: 0,
  },
  {
    id: 17,
    name: "Sofa Sudut Gold Dark Grey",
    slug: "sofa-sudut-gold",
    image: "/products/sofa-sudut-gold-0.jpg",
    images: [
      "/products/sofa-sudut-gold-0.jpg",
      "/products/sofa-sudut-gold-1.jpg",
      "/products/sofa-sudut-gold-2.jpg",
      "/products/sofa-sudut-gold-3.jpg",
      "/products/sofa-sudut-gold-4.jpg",
      "/products/sofa-sudut-gold-5.jpg",
    ],
    description: "Sofa sudut gold list gold elegant, desain mewah premium untuk ruang tamu. Sofa L premium berkualitas tinggi",
    longDescription:
      "Sofa Sudut Gold hadir dengan desain mewah premium dengan list gold elegant yang mempercantik ruang tamu Anda. Sofa L premium dengan bahan berkualitas menengah ke atas. Dudukan yang didesain khusus untuk menambah kenyamanan Anda. Tersedia banyak pilihan warna kain dan meja (bisa request). Material Busa Royal Foam dengan kain Bludru dan kayu Albasiah solid.",
    price: "Rp 6.600.000 - Rp 7.600.000",
    priceMin: 6600000,
    priceMax: 7600000,
    category: "Sofa Sudut",
    material: "Busa Royal Foam, Kayu Albasiah, Kain Bludru, Kaki Plastik",
    dimensions: "Sofa L Premium (bisa request ukuran sesuai ruang tamu)",
    featured: true,
    rating: 4.9,
    sold: 0,
  },
  {
    id: 18,
    name: "Sofa Kancing Veloz Sudut",
    slug: "sofa-kancing-veloz",
    image: "/products/sofa-kancing-veloz-0.jpg",
    images: [
      "/products/sofa-kancing-veloz-0.jpg",
      "/products/sofa-kancing-veloz-1.jpg",
      "/products/sofa-kancing-veloz-2.jpg",
      "/products/sofa-kancing-veloz-3.jpg",
      "/products/sofa-kancing-veloz-4.jpg",
      "/products/sofa-kancing-veloz-5.jpg",
      "/products/sofa-kancing-veloz-6.jpg",
    ],
    description: "Sofa kancing veloz sudut minimalis dan elegant tanpa meja, free bantal. Bisa custom warna dan ukuran",
    longDescription:
      "Sofa Kancing Veloz Sudut hadir dengan desain minimalis dan elegant tanpa meja. Ukuran 220 cm sudut 170 cm. Free bantal. Tersedia banyak pilihan warna kain dan meja (bisa request). Ready bahan Bludru, Kanvas, dan Oscar. Ready semua warna. Ukurannya bisa request sesuai ukuran ruang tamu Anda.",
    price: "Rp 7.700.000 - Rp 8.700.000",
    priceMin: 7700000,
    priceMax: 8700000,
    category: "Sofa Sudut",
    material: "Bludru / Kanvas / Oscar, Foam, Kayu Solid",
    dimensions: "220 cm Sudut 170 cm (bisa request ukuran)",
    featured: true,
    rating: 4.9,
    sold: 0,
  },
  {
    id: 19,
    name: "Sofa Mewah Aurum Seribu Kancing",
    slug: "sofa-aurum-kancing",
    image: "/products/sofa-aurum-kancing-0.jpg",
    images: [
      "/products/sofa-aurum-kancing-0.jpg",
      "/products/sofa-aurum-kancing-1.jpg",
      "/products/sofa-aurum-kancing-2.jpg",
      "/products/sofa-aurum-kancing-3.jpg",
      "/products/sofa-aurum-kancing-4.jpg",
      "/products/sofa-aurum-kancing-5.jpg",
      "/products/sofa-aurum-kancing-6.jpg",
    ],
    description: "Sofa mewah aurum seribu kancing ukuran 3 meter, meja dijual terpisah. COD tersedia. Free bantal",
    longDescription:
      "Sofa Mewah Aurum Seribu Kancing hadir dengan desain mewah premium bergaya singgasana raja dan ratu. Ukuran 3 meter x slonjor 180 cm. Gratis bantal sesuai foto. Meja dijual terpisah. Tersedia banyak pilihan warna kain (bisa request). Ready bahan Bludru, Kanvas, dan Oscar. Ukurannya bisa request sesuai ukuran ruang tamu Anda.",
    price: "Rp 9.000.000 - Rp 10.000.000",
    priceMin: 9000000,
    priceMax: 10000000,
    category: "Set Sofa",
    material: "Bludru / Kanvas / Oscar, Foam, Kayu Solid",
    dimensions: "3 Meter x Slonjor 180 cm (bisa request ukuran)",
    featured: true,
    rating: 4.9,
    sold: 0,
  },
  {
    id: 20,
    name: "Sofa Kancing Formasi 2+1+Fuf",
    slug: "sofa-kancing-formasi",
    image: "/products/sofa-kancing-formasi-0.jpg",
    images: [
      "/products/sofa-kancing-formasi-0.jpg",
      "/products/sofa-kancing-formasi-1.jpg",
      "/products/sofa-kancing-formasi-2.jpg",
      "/products/sofa-kancing-formasi-3.jpg",
      "/products/sofa-kancing-formasi-4.jpg",
    ],
    description: "Sofa kancing formasi 2+1+fuf 2 pics desain elegan warna kuning mewah. Bisa custom ukuran, model, warna",
    longDescription:
      "Sofa Kancing Formasi 2+1+Fuf 2 Pics hadir dengan desain elegan warna kuning mewah yang cocok untuk ruang tamu mewah. Formasi lengkap 2 seater + 1 seater + 2 fuf. Ukuran sofa 2 seater 180 cm, sofa 1 seater 110 cm, fuf kotak 60 cm persegi. Bahan Foxy kode warna 907. Bisa custom ukuran, model, dan warna.",
    price: "Rp 5.900.000 - Rp 6.900.000",
    priceMin: 5900000,
    priceMax: 6900000,
    category: "Set Sofa",
    material: "Foxy, Foam, Kayu Solid",
    dimensions: "2 Seater: 180 cm | 1 Seater: 110 cm | Fuf: 60x60 cm",
    featured: true,
    rating: 4.8,
    sold: 0,
  },
  {
    id: 21,
    name: "Sofa Retro Minimalis 2-1-1 Abu Tua",
    slug: "sofa-retro-2-1-1",
    image: "/products/sofa-retro-2-1-1-0.jpg",
    images: [
      "/products/sofa-retro-2-1-1-0.jpg",
      "/products/sofa-retro-2-1-1-1.jpg",
      "/products/sofa-retro-2-1-1-2.jpg",
      "/products/sofa-retro-2-1-1-3.jpg",
      "/products/sofa-retro-2-1-1-4.jpg",
      "/products/sofa-retro-2-1-1-5.jpg",
      "/products/sofa-retro-2-1-1-6.jpg",
    ],
    description: "Sofa retro ruang tamu minimalis formasi 2-1-1 warna abu tua, bahan premium berkualitas tinggi",
    longDescription:
      "Sofa Retro Ruang Tamu Minimalis hadir dengan formasi 2-1-1 warna abu tua yang elegan. Dudukan yang didesain khusus untuk menambah kenyamanan Anda, serta menambah keindahan dekorasi ruang. Material Busa Royal Foam dengan kain Bludru premium dan kayu Albasiah berkualitas. Tersedia banyak pilihan warna kain (bisa request).",
    price: "Rp 3.500.000 - Rp 4.300.000",
    priceMin: 3500000,
    priceMax: 4300000,
    category: "Set Sofa",
    material: "Busa Royal Foam, Kayu Albasiah, Kain Bludru, Kaki Plastik",
    dimensions: "Formasi 2-1-1 (bisa request ukuran sesuai ruang tamu)",
    featured: true,
    rating: 4.8,
    sold: 0,
  },
  {
    id: 22,
    name: "Sofa Retro L Putus 3 Seater",
    slug: "sofa-retro-l-putus-3seater",
    image: "/products/sofa-retro-l-putus-3seater-0.jpg",
    images: [
      "/products/sofa-retro-l-putus-3seater-0.jpg",
      "/products/sofa-retro-l-putus-3seater-1.jpg",
      "/products/sofa-retro-l-putus-3seater-2.jpg",
      "/products/sofa-retro-l-putus-3seater-3.jpg",
      "/products/sofa-retro-l-putus-3seater-4.jpg",
      "/products/sofa-retro-l-putus-3seater-5.jpg",
    ],
    description: "Sofa minimalis retro L putus 3 seater free bantal, bahan premium berkualitas menengah ke atas",
    longDescription:
      "Sofa Minimalis Retro L Putus 3 Seater hadir dengan desain elegan yang cocok untuk ruang tamu minimalis. Dudukan yang didesain khusus untuk menambah kenyamanan Anda, serta menambah keindahan dekorasi ruang yang didesain khusus dengan bahan premium berkualitas menengah ke atas. Dilengkapi free bantal furniture. Tersedia banyak pilihan warna kain.",
    price: "Rp 3.390.000 - Rp 4.200.000",
    priceMin: 3390000,
    priceMax: 4200000,
    category: "Sofa Sudut",
    material: "Busa Royal Foam, Kayu Albasiah, Kain Bludru, Kaki Retro",
    dimensions: "Tersedia beberapa ukuran (bisa request sesuai ruang tamu)",
    featured: true,
    rating: 4.9,
    sold: 0,
  },
  {
    id: 23,
    name: "Sofa Slonjor Force Abu Tua",
    slug: "sofa-slonjor-force-abu",
    image: "/products/sofa-slonjor-force-abu-0.jpg",
    images: [
      "/products/sofa-slonjor-force-abu-0.jpg",
      "/products/sofa-slonjor-force-abu-1.jpg",
      "/products/sofa-slonjor-force-abu-2.jpg",
      "/products/sofa-slonjor-force-abu-3.jpg",
      "/products/sofa-slonjor-force-abu-4.jpg",
      "/products/sofa-slonjor-force-abu-5.jpg",
    ],
    description: "Sofa santai slonjor force warna abu tua, desain khusus mewah. Material Silicon empuk premium",
    longDescription:
      "Sofa Santai Slonjor Force Warna Abu Tua hadir dengan desain khusus untuk menambah kenyamanan Anda dengan bahan berkualitas. Mempercantik dekorasi ruang tamu Anda dengan model mewah. Dapat menambah sensasi kenikmatan santai dengan merebahkan sebagian kaki ke slonjor sofa. Material Silicon empuk dengan kayu Albasiah solid dan kaki Stainles premium.",
    price: "Rp 6.580.000 - Rp 7.500.000",
    priceMin: 6580000,
    priceMax: 7500000,
    category: "Sofa Dudukan",
    material: "Silicon, Kayu Albasiah, Kain Bludru, Kaki Stainles",
    dimensions: "Slonjor panjang (bisa request ukuran sesuai ruang tamu)",
    featured: true,
    rating: 4.9,
    sold: 0,
  },
  {
    id: 24,
    name: "Sofa Slonjor Force",
    slug: "sofa-slonjor-force",
    image: "/products/sofa-slonjor-force-0.jpg",
    images: [
      "/products/sofa-slonjor-force-0.jpg",
      "/products/sofa-slonjor-force-1.jpg",
      "/products/sofa-slonjor-force-2.jpg",
      "/products/sofa-slonjor-force-3.jpg",
    ],
    description: "Sofa santai slonjor force, desain minimalis elegan. Bisa custom ukuran dan warna",
    longDescription:
      "Sofa Santai Slonjor Force hadir dengan desain minimalis elegan. Dudukan yang didesain khusus untuk menambah kenyamanan Anda, serta menambah keindahan dekorasi ruang. Material Busa Royal Foam dengan kain Bludru dan kayu Albasiah solid. Tersedia banyak pilihan warna kain dan ukuran bisa request sesuai ruang tamu Anda.",
    price: "Rp 6.580.000 - Rp 7.600.000",
    priceMin: 6580000,
    priceMax: 7600000,
    category: "Sofa Dudukan",
    material: "Busa Royal Foam, Kayu Albasiah, Kain Bludru, Kaki Plastik",
    dimensions: "Slonjor panjang (bisa request ukuran sesuai ruang tamu)",
    featured: true,
    rating: 4.8,
    sold: 0,
  },
  {
    id: 25,
    name: "Sofa Yura Single 1 Seater",
    slug: "sofa-yura-single",
    image: "/products/sofa-yura-single-0.jpg",
    images: [
      "/products/sofa-yura-single-0.jpg",
      "/products/sofa-yura-single-1.jpg",
      "/products/sofa-yura-single-2.jpg",
      "/products/sofa-yura-single-3.jpg",
    ],
    description: "Sofa yura single 1 seater, desain minimalis elegan. Cocok untuk ruangan kecil atau pelengkap set sofa",
    longDescription:
      "Sofa Yura Single 1 Seater hadir dengan desain minimalis elegan yang cocok untuk ruangan kecil atau sebagai pelengkap set sofa. Material berkualitas premium dengan kain Bludru halus dan busa empuk untuk kenyamanan maksimal. Tersedia banyak pilihan warna kain (bisa request).",
    price: "Rp 2.160.000 - Rp 2.600.000",
    priceMin: 2160000,
    priceMax: 2600000,
    category: "Armchair",
    material: "Bludru / Kanvas / Oscar, Foam, Kayu Solid",
    dimensions: "1 Seater (bisa request ukuran)",
    featured: false,
    rating: 4.8,
    sold: 0,
  },
  {
    id: 26,
    name: "Sofa Verona Minimalis 3 Dudukan",
    slug: "sofa-verona",
    image: "/products/sofa-verona-0.jpg",
    images: [
      "/products/sofa-verona-0.jpg",
      "/products/sofa-verona-1.jpg",
      "/products/sofa-verona-2.jpg",
      "/products/sofa-verona-3.jpg",
      "/products/sofa-verona-4.jpg",
      "/products/sofa-verona-5.jpg",
      "/products/sofa-verona-6.jpg",
      "/products/sofa-verona-7.jpg",
      "/products/sofa-verona-8.jpg",
    ],
    description: "Sofa Verona minimalis ukuran 210 cm 3 dudukan. Bisa request warna, bahan, dan ukuran",
    longDescription:
      "Sofa Verona Minimalis hadir dengan desain elegan ukuran 210 cm untuk 3 dudukan. Tersedia banyak pilihan warna kain dan meja (bisa request). Ready bahan Bludru, Vegas, Midili, Kanvas, dan Oscar. Ready semua warna. Ukurannya bisa request sesuai ukuran ruang tamu Anda.",
    price: "Rp 3.500.000 - Rp 4.300.000",
    priceMin: 3500000,
    priceMax: 4300000,
    category: "Sofa Dudukan",
    material: "Bludru / Vegas / Midili / Kanvas / Oscar, Foam, Kayu Solid",
    dimensions: "Panjang 210 cm (bisa request ukuran sesuai ruang tamu)",
    featured: true,
    rating: 4.8,
    sold: 0,
  },
  {
    id: 27,
    name: "Sofa Yura + Stool Tanpa Meja",
    slug: "sofa-yura-stool",
    image: "/products/sofa-yura-stool-0.jpg",
    images: [
      "/products/sofa-yura-stool-0.jpg",
      "/products/sofa-yura-stool-1.jpg",
      "/products/sofa-yura-stool-2.jpg",
      "/products/sofa-yura-stool-3.jpg",
    ],
    description: "Set sofa Yura + stool tanpa meja, desain minimalis elegan. Cocok untuk ruang tamu",
    longDescription:
      "Set Sofa Yura + Stool hadir dengan desain minimalis elegan cocok untuk ruang tamu. Spesifikasi komponen: Sofa Yura 3 seater + stool. Tidak termasuk meja. Sofa ini memberikan kenyamanan dengan stool yang disertakan. Pastikan ruang tamu Anda memiliki cukup ruang untuk sofa Yura + stool ini. Tersedia banyak pilihan warna kain.",
    price: "Rp 2.700.000 - Rp 3.480.000",
    priceMin: 2700000,
    priceMax: 3480000,
    category: "Set Sofa",
    material: "Bludru / Kanvas / Oscar, Foam, Kayu Solid",
    dimensions: "Sofa Yura 3 Seater + Stool (bisa request ukuran)",
    featured: true,
    rating: 4.8,
    sold: 0,
  },
  {
    id: 28,
    name: "Sofa Kerang Viral Bestseller",
    slug: "sofa-kerang-viral",
    image: "/products/sofa-kerang-viral-0.jpg",
    images: [
      "/products/sofa-kerang-viral-0.jpg",
      "/products/sofa-kerang-viral-1.jpg",
      "/products/sofa-kerang-viral-2.jpg",
      "/products/sofa-kerang-viral-3.jpg",
      "/products/sofa-kerang-viral-4.jpg",
      "/products/sofa-kerang-viral-5.jpg",
      "/products/sofa-kerang-viral-6.jpg",
      "/products/sofa-kerang-viral-7.jpg",
    ],
    description: "Bestseller sofa kerang viral, sofa tamu elegan sultan. Model kerang minimalis desain premium",
    longDescription:
      "Bestseller Sofa Kerang Viral hadir dengan desain elegan bergaya sultan yang sedang viral. Dudukan yang didesain khusus untuk menambah kenyamanan Anda, serta menambah keindahan dekorasi ruang. Material Busa Royal Foam dengan kain Bludru premium dan kayu Albasiah solid. Tersedia banyak pilihan warna kain (bisa request).",
    price: "Rp 3.500.000 - Rp 4.300.000",
    priceMin: 3500000,
    priceMax: 4300000,
    category: "Sofa Dudukan",
    material: "Busa Royal Foam, Kayu Albasiah, Kain Bludru, Kaki Plastik",
    dimensions: "Tersedia beberapa ukuran (bisa request sesuai ruang tamu)",
    featured: true,
    rating: 4.9,
    sold: 0,
  },
  {
    id: 29,
    name: "Sofa Slonjor Glinda Listgold",
    slug: "sofa-slonjor-glinda",
    image: "/products/sofa-slonjor-glinda-0.jpg",
    images: [
      "/products/sofa-slonjor-glinda-0.jpg",
      "/products/sofa-slonjor-glinda-1.jpg",
      "/products/sofa-slonjor-glinda-2.jpg",
      "/products/sofa-slonjor-glinda-3.jpg",
      "/products/sofa-slonjor-glinda-4.jpg",
      "/products/sofa-slonjor-glinda-5.jpg",
      "/products/sofa-slonjor-glinda-6.jpg",
      "/products/sofa-slonjor-glinda-7.jpg",
      "/products/sofa-slonjor-glinda-8.jpg",
      "/products/sofa-slonjor-glinda-9.jpg",
      "/products/sofa-slonjor-glinda-10.jpg",
      "/products/sofa-slonjor-glinda-11.jpg",
    ],
    description: "Sofa slonjor Glinda tanpa meja, dilengkapi listgold, gratis bantal. Custom warna dan ukuran",
    longDescription:
      "Sofa Slonjor Glinda hadir dengan desain mewah dilengkapi listgold yang memberikan sentuhan elegan. Ukuran 210 x slonjor 170 cm. Gratis bantal. Tersedia banyak pilihan warna kain dan meja (bisa request). Ready bahan Bludru, Kanvas, dan Oscar. Ready semua warna. Ukurannya bisa request sesuai ukuran ruang tamu Anda.",
    price: "Rp 6.700.000 - Rp 7.600.000",
    priceMin: 6700000,
    priceMax: 7600000,
    category: "Sofa Dudukan",
    material: "Bludru / Kanvas / Oscar, Foam, Kayu Solid",
    dimensions: "210 cm x Slonjor 170 cm (bisa request ukuran)",
    featured: true,
    rating: 4.9,
    sold: 0,
  },
  {
    id: 30,
    name: "Sofa Minimalis Sudut Simple Elegant",
    slug: "sofa-sudut-simple-elegant",
    image: "/products/sofa-sudut-simple-elegant-0.jpg",
    images: [
      "/products/sofa-sudut-simple-elegant-0.jpg",
      "/products/sofa-sudut-simple-elegant-1.jpg",
      "/products/sofa-sudut-simple-elegant-2.jpg",
      "/products/sofa-sudut-simple-elegant-3.jpg",
    ],
    description: "Sofa minimalis sudut simple dan elegant, sofa ruang tamu aesthetich. Free bantal",
    longDescription:
      "Sofa Minimalis Sudut Simple dan Elegant hadir dengan desain aesthetich yang cocok untuk ruang tamu. Formasi 4 dudukan slonjor, ukuran 3 meter L putus 115 cm. Gratis bantal sesuai foto. Bahan bisa request mulai dari Bludru, Vegas, Midili, Velvet, Mery dan lain lain. Ukuran bisa request sesuai ruang tamu Anda.",
    price: "Rp 6.790.000 - Rp 7.800.000",
    priceMin: 6790000,
    priceMax: 7800000,
    category: "Sofa Sudut",
    material: "Bludru / Vegas / Midili / Velvet / Mery, Foam, Kayu Solid",
    dimensions: "4 Dudukan Slonjor: 3 Meter | L Putus: 115 cm (bisa request)",
    featured: true,
    rating: 4.9,
    sold: 0,
  },
  {
    id: 31,
    name: "Meja Granit Bulat & Kotak",
    slug: "meja-granit",
    image: "/products/meja-granit-0.jpg",
    images: [
      "/products/meja-granit-0.jpg",
      "/products/meja-granit-1.jpg",
      "/products/meja-granit-2.jpg",
      "/products/meja-granit-3.jpg",
      "/products/meja-granit-4.jpg",
      "/products/meja-granit-5.jpg",
    ],
    description: "Meja granit bulat, meja granit kotak, dan meja bungkus sofa. Material premium berkualitas",
    longDescription:
      "Meja Granit hadir dalam 3 varian: meja granit bulat, meja granit kotak, dan meja bungkus sofa. Material berkualitas premium dengan Busa Royal Foam, kayu Albasiah solid, kain Bludru, dan kaki plastik. Cocok sebagai pelengkap sofa ruang tamu. Tersedia banyak pilihan warna dan ukuran (bisa request).",
    price: "Rp 4.000.000 - Rp 4.500.000",
    priceMin: 4000000,
    priceMax: 4500000,
    category: "Set Sofa",
    material: "Busa Royal Foam, Kayu Albasiah, Kain Bludru, Kaki Plastik",
    dimensions: "Tersedia varian bulat, kotak, dan bungkus (bisa request ukuran)",
    featured: true,
    rating: 4.8,
    sold: 0,
  },
  {
    id: 32,
    name: "Sofa Minimalis Free Bantal+Bench Emas Furniture",
    slug: "sofa-minimalis-bench-emas",
    image: "/products/sofa-sofa-minimalis-bench-emas-0.webp",
    images: [
      "/products/sofa-sofa-minimalis-bench-emas-0.webp",
      "/products/sofa-sofa-minimalis-bench-emas-1.webp",
      "/products/sofa-sofa-minimalis-bench-emas-2.webp",
      "/products/sofa-sofa-minimalis-bench-emas-3.webp",
      "/products/sofa-sofa-minimalis-bench-emas-4.webp",
      "/products/sofa-sofa-minimalis-bench-emas-5.webp",
      "/products/sofa-sofa-minimalis-bench-emas-6.webp",
      "/products/sofa-sofa-minimalis-bench-emas-7.webp",
      "/products/sofa-sofa-minimalis-bench-emas-8.webp",
    ],
    description: "Sofa minimalis elegan dengan free bantal dan bench sudut ruang tamu. Bahan premium berkualitas menengah",
    longDescription:
      "Sofa minimalis ini memiliki dudukan yang didesain khusus untuk menambah kenyamanan Anda, serta menambah keindahan dekorasi ruang yang didesain khusus dengan bahan premium yang berkualitas menengah. Material Busa Royal Foam dengan kayu Albasiah dan kain Bludru Midily yang halus. Dilengkapi free bantal dan bench sudut ruang tamu.",
    price: "Rp 3.390.000 - Rp 4.300.000",
    priceMin: 3390000,
    priceMax: 4300000,
    category: "Sofa Dudukan",
    material: "Busa Royal Foam, Kayu Albasiah, Kain Bludru Midily",
    dimensions: "Tersedia beberapa ukuran (bisa request sesuai ruang tamu)",
    featured: true,
    rating: 4.9,
    sold: 0,
  },
  {
    id: 33,
    name: "Sofa Zavira Slonjor 3 Siter Minimalis",
    slug: "sofa-zavira-slonjor-3siter",
    image: "/products/sofa-sofa-zavira-slonjor-3siter-0.webp",
    images: [
      "/products/sofa-sofa-zavira-slonjor-3siter-0.webp",
      "/products/sofa-sofa-zavira-slonjor-3siter-1.webp",
      "/products/sofa-sofa-zavira-slonjor-3siter-2.webp",
      "/products/sofa-sofa-zavira-slonjor-3siter-3.webp",
      "/products/sofa-sofa-zavira-slonjor-3siter-4.webp",
      "/products/sofa-sofa-zavira-slonjor-3siter-5.webp",
    ],
    description: "Sofa Zavira slonjor 3 siter minimalis kaki kayu, free bantal kecil dan besar. Bisa request warna",
    longDescription:
      "Sofa Zavira Slonjor 3 Siter hadir dengan desain minimalis kaki kayu yang elegan. Ukuran panjang 200 cm x lebar 90 cm x tinggi 80 cm. Kaki kayu Mahoni yang kokoh. Free Bantal 5 PICS (kecil dan besar). Tersedia banyak pilihan warna kain dan meja (bisa request). Ready semua warna. Ukurannya bisa request sesuai ukuran ruang tamu Anda. Sofa diantar pakai mobil pabrik.",
    price: "Rp 4.640.000 - Rp 5.500.000",
    priceMin: 4640000,
    priceMax: 5500000,
    category: "Sofa Dudukan",
    material: "Busa Royal Foam, Kayu Mahoni, Kain Bludru / Kanvas / Oscar",
    dimensions: "Panjang 200 cm x Lebar 90 cm x Tinggi 80 cm",
    featured: true,
    rating: 4.9,
    sold: 0,
  },
  {
    id: 34,
    name: "Sofa Tangan Minang Free Bench",
    slug: "sofa-tangan-minang-bench",
    image: "/products/sofa-sofa-tangan-minang-bench-0.webp",
    images: [
      "/products/sofa-sofa-tangan-minang-bench-0.webp",
      "/products/sofa-sofa-tangan-minang-bench-1.webp",
      "/products/sofa-sofa-tangan-minang-bench-2.webp",
      "/products/sofa-sofa-tangan-minang-bench-3.webp",
      "/products/sofa-sofa-tangan-minang-bench-4.webp",
      "/products/sofa-sofa-tangan-minang-bench-5.webp",
      "/products/sofa-sofa-tangan-minang-bench-6.webp",
      "/products/sofa-sofa-tangan-minang-bench-7.webp",
      "/products/sofa-sofa-tangan-minang-bench-8.webp",
    ],
    description: "Sofa minimalis 3 seater free bench, sofa tangan minang variasi rok. Bahan premium berkualitas",
    longDescription:
      "Sofa Minimalis 3 Seater Free Bench / Sofa Tangan Minang / Sofa Variasi Rok hadir dengan desain khusus untuk menambah kenyamanan Anda, serta menambah keindahan dekorasi ruang yang didesain khusus dengan bahan premium yang berkualitas menengah. Material Busa Royal Foam dengan kayu Albasiah dan kain Bludru. Dilengkapi free bench sofa tangan minang variasi rok busa kayu.",
    price: "Rp 3.390.000 - Rp 4.200.000",
    priceMin: 3390000,
    priceMax: 4200000,
    category: "Sofa Dudukan",
    material: "Busa Royal Foam, Kayu Albasiah, Kain Bludru",
    dimensions: "Tersedia beberapa ukuran (bisa request sesuai ruang tamu)",
    featured: true,
    rating: 4.9,
    sold: 0,
  },
  {
    id: 35,
    name: "Divan Ranjang Kasur Sandaran Salur Albasyiah",
    slug: "divan-ranjang-albasyiah",
    image: "/products/sofa-divan-ranjang-albasyiah-0.webp",
    images: [
      "/products/sofa-divan-ranjang-albasyiah-0.webp",
      "/products/sofa-divan-ranjang-albasyiah-1.webp",
      "/products/sofa-divan-ranjang-albasyiah-2.webp",
      "/products/sofa-divan-ranjang-albasyiah-3.webp",
      "/products/sofa-divan-ranjang-albasyiah-4.webp",
      "/products/sofa-divan-ranjang-albasyiah-5.webp",
      "/products/sofa-divan-ranjang-albasyiah-6.webp",
    ],
    description: "Divan ranjang kasur sandaran salur kayu albasyiah 160x200 cm. Bisa custom model divan",
    longDescription:
      "Divan Ranjang Kasur Sandaran Salur Kayu Albasyiah hadir dengan rangka kayu keras dari Kalimantan yang memberi rasa aman dan stabil. Bahan OScar menghadirkan permukaan halus disentuh. Sandaran salur tinggi ±120 cm untuk posisi membaca/relaks lebih nyaman. Tersedia ukuran 160x200 cm, 180x200 cm, dan 200x200 cm. Finishing warna masuk sesuai kode yang Anda masukkan di catatan pesanan.",
    price: "Rp 2.340.000 - Rp 2.800.000",
    priceMin: 2340000,
    priceMax: 2800000,
    category: "Set Sofa",
    material: "Rangka Kayu Keras Albasyiah, Bahan OScar",
    dimensions: "160 x 200 x 31 cm (tersedia juga 180x200 cm dan 200x200 cm) | Sandaran: ±120 cm",
    featured: true,
    rating: 4.9,
    sold: 0,
  },
  {
    id: 36,
    name: "Sofa Arunika + Meja Kaca",
    slug: "sofa-arunika-meja-kaca",
    image: "/products/sofa-sofa-arunika-meja-kaca-0.webp",
    images: [
      "/products/sofa-sofa-arunika-meja-kaca-0.webp",
      "/products/sofa-sofa-arunika-meja-kaca-1.webp",
      "/products/sofa-sofa-arunika-meja-kaca-2.webp",
      "/products/sofa-sofa-arunika-meja-kaca-3.webp",
      "/products/sofa-sofa-arunika-meja-kaca-4.webp",
      "/products/sofa-sofa-arunika-meja-kaca-5.webp",
    ],
    description: "Sofa Arunika elegan tahan lama dengan meja dan kaca. Design estetik untuk ruang tamu modern",
    longDescription:
      "Sofa Arunika menawarkan desain yang elegan dan tahan lama. Cocok untuk menciptakan ruang yang estetik di rumah Anda. Desainnya yang khas membuat sofa ini menjadi pilihan yang tepat untuk berbagai gaya interior. Ukuran 3 siter panjang 210 x lebar 80 cm x tinggi 75 cm. Free Bantal 4 PICS. Tersedia banyak pilihan warna kain dan meja (bisa request). Ready semua warna. Ukurannya bisa request sesuai ruang tamu Anda.",
    price: "Rp 3.370.000 - Rp 4.500.000",
    priceMin: 3370000,
    priceMax: 4500000,
    category: "Sofa Dudukan",
    material: "Busa Royal Foam, Kayu Solid, Kain Bludru / Kanvas / Oscar, Meja Kaca",
    dimensions: "Panjang 210 cm x Lebar 80 cm x Tinggi 75 cm",
    featured: true,
    rating: 4.9,
    sold: 0,
  },
  {
    id: 37,
    name: "2 pcs Kursi Stool Bulat Sofa Puff",
    slug: "kursi-stool-bulat-2pcs",
    image: "/products/sofa-kursi-stool-bulat-2pcs-0.webp",
    images: [
      "/products/sofa-kursi-stool-bulat-2pcs-0.webp",
      "/products/sofa-kursi-stool-bulat-2pcs-1.webp",
      "/products/sofa-kursi-stool-bulat-2pcs-2.webp",
      "/products/sofa-kursi-stool-bulat-2pcs-3.webp",
      "/products/sofa-kursi-stool-bulat-2pcs-4.webp",
      "/products/sofa-kursi-stool-bulat-2pcs-5.webp",
      "/products/sofa-kursi-stool-bulat-2pcs-6.webp",
    ],
    description: "2 pcs kursi stool bulat / sofa stool / puff besar minimalis viral trend estetik. Sofa serbaguna",
    longDescription:
      "Sofa Stool Minimalis bisa menjadikan ruangan kamu lebih cantik dan aesthetic. Sofa dengan gaya tabung artistic ini bisa kamu gunakan di ruang tamu atau di kamar, karena ukurannya yang minimalis. Finishing jahitan yang rapih menggunakan kain kanvas dan beludru yang berkualitas. Material kayu solid dan kuat sebagai kaki sofa stool. Tinggi 40 cm, Diameter 35 cm. Tersedia berbagai motif dan warna.",
    price: "Rp 650.000",
    priceMin: 650000,
    priceMax: 650000,
    category: "Armchair",
    material: "Kain Kanvas / Beludru, Kayu Solid",
    dimensions: "Tinggi 40 cm, Diameter 35 cm",
    featured: true,
    rating: 4.8,
    sold: 0,
  },
];

const FEATURES = [
  {
    icon: Shield,
    title: "Material Premium",
    description:
      "Kami hanya menggunakan bahan baku berkualitas tinggi, foam densitas tinggi, dan kain yang tahan lama.",
  },
  {
    icon: Ruler,
    title: "Custom Order",
    description:
      "Desain sofa bisa disesuaikan dengan kebutuhan dan selera Anda, termasuk ukuran dan warna.",
  },
  {
    icon: Award,
    title: "Garansi Resmi",
    description:
      "Setiap produk sofa kami dilengkapi garansi resmi untuk menjamin kepuasan Anda.",
  },
  {
    icon: Truck,
    title: "Pengiriman Gratis",
    description:
      "Gratis pengiriman untuk area Bandung dan sekitarnya dengan layanan profesional.",
  },
];

const TESTIMONIALS = [
  {
    name: "Budi Santoso",
    location: "Bandung",
    text: "Sofa dari Alfi sangat nyaman dan berkualitas! Desainnya juga modern banget. Sudah 3 tahun pakai masih awet.",
    rating: 5,
  },
  {
    name: "Siti Rahayu",
    location: "Cimahi",
    text: "Pelayanannya ramah dan profesional. Sofa custom sesuai permintaan, hasilnya melebihi ekspektasi. Recommended!",
    rating: 5,
  },
  {
    name: "Ahmad Fauzi",
    location: "Jakarta",
    text: "Harga sangat kompetitif untuk kualitas premium. Pengiriman cepat dan rapi. Terima kasih Alfi Sofa!",
    rating: 5,
  },
];

const PRODUCTS_PER_PAGE = 9;

/* ──────────────────────────────── animation helper ──────────────────────────── */

function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────── Navbar ───────────────────────────────────── */

function Navbar({
  currentView,
  onNavigate,
}: {
  currentView: ViewMode;
  onNavigate: (view: ViewMode, href?: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isProductsView = currentView === "products";
  const navbarBg = isProductsView
    ? "bg-white/95 backdrop-blur-md shadow-md"
    : scrolled
      ? "bg-white/95 backdrop-blur-md shadow-md"
      : "bg-transparent";

  const textColor = isProductsView
    ? "text-gray-700"
    : scrolled
      ? "text-gray-700"
      : "text-white/90 hover:text-white";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarBg}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button onClick={() => onNavigate("home", "#beranda")} className="flex items-center gap-1">
          <span className={`text-2xl font-extrabold tracking-tight transition-colors ${isProductsView || scrolled ? "text-red-600" : "text-white"}`}>
            ALFI SOFA
          </span>
          <span className={`text-xs font-medium transition-colors ${isProductsView || scrolled ? "text-red-400" : "text-red-200"}`}>
            BANDUNG
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => onNavigate(link.view, link.href)}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-red-600 ${link.view === "products" && currentView === "products" ? "!text-red-600 font-semibold" : textColor}`}
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://wa.me/6285198778338"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 inline-flex items-center gap-2 rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-600 hover:shadow-md"
          >
            <MessageCircle className="size-4" />
            WhatsApp
          </a>
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={isProductsView || scrolled ? "text-gray-700" : "text-white"}
              >
                <Menu className="size-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left text-red-600">
                  ALFI SOFA BANDUNG
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 pt-6 pb-4">
                {NAV_LINKS.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <button
                      onClick={() => onNavigate(link.view, link.href)}
                      className="rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      {link.label}
                    </button>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

/* ──────────────────────────────── Hero ─────────────────────────────────────── */

function HeroSection({ onNavigate }: { onNavigate: (view: ViewMode, href?: string) => void }) {
  return (
    <section id="beranda" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/hero-sofa.png"
          alt="Alfi Sofa Bandung Hero"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Sofa Berkualitas Premium
          <br />
          untuk <span className="text-red-400">Rumah Impian Anda</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
        >
          Produsen sofa terpercaya di Bandung Barat. Kualitas terbaik,
          harga terjangkau.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-10 flex flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Button
            size="lg"
            onClick={() => onNavigate("products")}
            className="bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-xl sm:px-8 sm:text-base"
          >
            Lihat Koleksi
          </Button>
          <Button
            size="lg"
            onClick={() => onNavigate("home", "#kontak")}
            className="border-2 border-white/40 bg-transparent px-5 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10 hover:text-white sm:px-8 sm:text-base"
          >
            Hubungi Kami
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-xs text-white/60">Scroll</span>
          <ChevronUp className="size-5 rotate-180 text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ──────────────────────────────── About ────────────────────────────────────── */

function AboutSection() {
  return (
    <section id="tentang" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img
                src="/images/about-alfi.png"
                alt="Tentang Alfi Sofa Bandung"
                className="h-auto w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 to-transparent" />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div>
              <span className="inline-block rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-600">
                Tentang Kami
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Produsen Sofa Terpercaya
                <br />
                <span className="text-red-600">di Bandung</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
                Alfi Sofa Bandung adalah produsen sofa berkualitas yang telah
                melayani masyarakat Bandung dan sekitarnya.
              </p>
              <p className="mt-3 text-base leading-relaxed text-gray-600">
                Kami menghadirkan sofa
                dengan desain modern, material premium, dan harga yang
                kompetitif.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
                {STATS.map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-red-50 px-2 py-4 text-center sm:px-4 sm:py-5">
                    <p className="text-xl font-extrabold text-red-600 sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[10px] leading-tight text-gray-500 sm:text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Sosmed & Marketplace */}
              <div className="mt-10">
                <p className="mb-4 text-center text-xs font-bold uppercase tracking-wider text-gray-400">Ikuti Kami</p>
                {/* Mobile: marquee */}
                <div className="overflow-hidden sm:hidden">
                  <div className="flex animate-marquee gap-3 hover:[animation-play-state:paused]">
                    <a href="https://www.instagram.com/alfisofa_bandung" target="_blank" rel="noopener noreferrer" className="flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition-all hover:border-pink-300 hover:text-pink-600 hover:shadow-md">
                      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                      Instagram
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61566388113783" target="_blank" rel="noopener noreferrer" className="flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition-all hover:border-blue-300 hover:text-blue-600 hover:shadow-md">
                      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                      Facebook
                    </a>
                    <a href="https://vt.tiktok.com/ZS98EPB7eVou4-vCxtO/" target="_blank" rel="noopener noreferrer" className="flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition-all hover:border-gray-400 hover:text-black hover:shadow-md">
                      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 4.76 1.52V6.8a4.84 4.84 0 0 1-1-.11z"/></svg>
                      TikTok Shop
                    </a>
                    <a href="https://youtube.com/@alfisofabandung" target="_blank" rel="noopener noreferrer" className="flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition-all hover:border-red-300 hover:text-red-600 hover:shadow-md">
                      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                      YouTube
                    </a>
                    <a href="https://shopee.co.id/gudang_sofa_bandung" target="_blank" rel="noopener noreferrer" className="flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition-all hover:border-orange-300 hover:text-orange-600 hover:shadow-md">
                      <ShoppingBag className="size-5" />
                      Shopee
                    </a>
                    <a href="https://wa.me/6285198778338?text=Halo%20Alfi%20Sofa,%20saya%20ingin%20bertanya%20tentang%20sofa." target="_blank" rel="noopener noreferrer" className="flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition-all hover:border-green-300 hover:text-green-600 hover:shadow-md">
                      <svg className="size-5" viewBox="0 0 32 32" fill="currentColor"><path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.744 3.054 9.378L1.056 31.2l6.062-1.95a15.9 15.9 0 0 0 8.886 2.692C24.826 31.942 32 24.766 32 16.004S24.826 0 16.004 0zm9.35 22.614c-.392 1.106-2.286 2.05-3.188 2.178-.822.116-1.86.166-3.002-.192a27.3 27.3 0 0 1-2.736-1.014c-4.816-2.086-7.968-6.964-8.212-7.296-.236-.334-1.936-2.578-1.936-4.918s1.226-3.486 1.66-3.964c.434-.478.95-.6 1.266-.6.316 0 .632.002.908.016.292.016.682-.11 1.066.814.392.942 1.332 3.252 1.45 3.488.116.236.196.514.04.828-.156.314-.236.508-.47.786-.236.278-.496.622-.708.834-.236.236-.482.492-.206.966.274.474 1.222 2.016 2.624 3.266 1.802 1.61 3.322 2.108 3.796 2.344.474.236.75.196 1.026-.118.278-.316 1.188-1.384 1.504-1.858.316-.474.632-.392 1.066-.236.434.156 2.748 1.296 3.222 1.532.474.236.79.354.908.55.118.196.118 1.136-.274 2.244z"/></svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
                {/* Desktop: static centered */
                <div className="hidden flex-wrap items-center justify-center gap-3 sm:flex">
                  <a href="https://www.instagram.com/alfisofa_bandung" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition-all hover:border-pink-300 hover:text-pink-600 hover:shadow-md">
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    Instagram
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61566388113783" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition-all hover:border-blue-300 hover:text-blue-600 hover:shadow-md">
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    Facebook
                  </a>
                  <a href="https://vt.tiktok.com/ZS98EPB7eVou4-vCxtO/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition-all hover:border-gray-400 hover:text-black hover:shadow-md">
                    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 4.76 1.52V6.8a4.84 4.84 0 0 1-1-.11z"/></svg>
                    TikTok Shop
                  </a>
                  <a href="https://youtube.com/@alfisofabandung" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition-all hover:border-red-300 hover:text-red-600 hover:shadow-md">
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                    YouTube
                  </a>
                  <a href="https://shopee.co.id/gudang_sofa_bandung" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition-all hover:border-orange-300 hover:text-orange-600 hover:shadow-md">
                    <ShoppingBag className="size-5" />
                    Shopee
                  </a>
                  <a href="https://wa.me/6285198778338?text=Halo%20Alfi%20Sofa,%20saya%20ingin%20bertanya%20tentang%20sofa." target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition-all hover:border-green-300 hover:text-green-600 hover:shadow-md">
                    <svg className="size-5" viewBox="0 0 32 32" fill="currentColor"><path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.744 3.054 9.378L1.056 31.2l6.062-1.95a15.9 15.9 0 0 0 8.886 2.692C24.826 31.942 32 24.766 32 16.004S24.826 0 16.004 0zm9.35 22.614c-.392 1.106-2.286 2.05-3.188 2.178-.822.116-1.86.166-3.002-.192a27.3 27.3 0 0 1-2.736-1.014c-4.816-2.086-7.968-6.964-8.212-7.296-.236-.334-1.936-2.578-1.936-4.918s1.226-3.486 1.66-3.964c.434-.478.95-.6 1.266-.6.316 0 .632.002.908.016.292.016.682-.11 1.066.814.392.942 1.332 3.252 1.45 3.488.116.236.196.514.04.828-.156.314-.236.508-.47.786-.236.278-.496.622-.708.834-.236.236-.482.492-.206.966.274.474 1.222 2.016 2.624 3.266 1.802 1.61 3.322 2.108 3.796 2.344.474.236.75.196 1.026-.118.278-.316 1.188-1.384 1.504-1.858.316-.474.632-.392 1.066-.236.434.156 2.748 1.296 3.222 1.532.474.236.79.354.908.55.118.196.118 1.136-.274 2.244z"/></svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Featured Products Preview ───────────────────────── */

function FeaturedProductsPreview({ onNavigate }: { onNavigate: (view: ViewMode) => void }) {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  return (
    <section id="produk" className="bg-gray-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-600">
              Produk Unggulan
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Koleksi <span className="text-red-600">Terbaru Kami</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-gray-500">
              Temukan sofa impian Anda dari berbagai koleksi berkualitas premium
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.1}>
              <Card className="group h-full overflow-hidden border-0 py-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge className="absolute left-3 top-3 bg-red-600 text-white text-xs">
                    {product.category}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-base font-bold text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-bold text-red-600">{product.price.split(" - ")[0]}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Star className="size-3 fill-yellow-400 text-yellow-400" />
                      {product.rating}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-12 text-center">
            <Button
              size="lg"
              onClick={() => onNavigate("products")}
              className="bg-red-600 px-10 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-xl"
            >
              <Package className="mr-2 size-5" />
              Lihat Semua Produk ({PRODUCTS.length})
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────── Product Detail Dialog ──────────────────────────────── */

function ProductDetailDialog({
  product,
  open,
  onClose,
}: {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}) {
  const [currentImg, setCurrentImg] = useState(0);

  if (!product) return null;

  const galleryImages = product.images.length > 0 ? product.images : [product.image];

  const waLink = `https://wa.me/6285198778338?text=${encodeURIComponent(`Halo Alfi Sofa, saya tertarik dengan produk ${product.name} (${product.price}). Mohon informasi lebih lanjut.`)}`;

  const prevImg = () => setCurrentImg((p) => (p === 0 ? galleryImages.length - 1 : p - 1));
  const nextImg = () => setCurrentImg((p) => (p === galleryImages.length - 1 ? 0 : p + 1));

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { setCurrentImg(0); onClose(); } }}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 sm:rounded-2xl">
        <div className="grid sm:grid-cols-2">
          {/* Image Slider */}
          <div className="relative aspect-square bg-gray-100 sm:rounded-l-2xl">
            {/* Main Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImg}
                src={galleryImages[currentImg]}
                alt={`${product.name} - Gambar ${currentImg + 1}`}
                className="absolute inset-0 h-full w-full object-cover sm:rounded-l-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>

            <Badge className="absolute left-3 top-3 z-10 bg-red-600 text-white">
              {product.category}
            </Badge>

            {/* Navigation Arrows */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={prevImg}
                  className="absolute left-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur-sm transition-all hover:bg-black/60 hover:text-white"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  onClick={nextImg}
                  className="absolute right-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur-sm transition-all hover:bg-black/60 hover:text-white"
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}

            {/* Dots Indicator */}
            {galleryImages.length > 1 && (
              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                {galleryImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImg(i)}
                    className={`size-2 rounded-full transition-all ${i === currentImg ? "w-5 bg-white" : "bg-white/50 hover:bg-white/70"}`}
                  />
                ))}
              </div>
            )}

            {/* Image Counter */}
            {galleryImages.length > 1 && (
              <div className="absolute bottom-3 right-3 z-10 rounded-full bg-black/50 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                {currentImg + 1} / {galleryImages.length}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6">
            <DialogHeader className="mb-0">
              <DialogTitle className="text-xl font-bold text-gray-900 sm:text-2xl">
                {product.name}
              </DialogTitle>
            </DialogHeader>

            {/* Rating & Sold */}
            <div className="mt-2 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`size-4 ${j < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                  />
                ))}
                <span className="ml-1 text-sm font-medium text-gray-600">{product.rating}</span>
              </div>

            </div>

            {/* Price */}
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <p className="text-xl font-extrabold text-red-600">{product.price}</p>
                {product.originalPrice && (
                  <p className="text-sm text-gray-400 line-through">{product.originalPrice}</p>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-400">*Harga tergantung ukuran & material pilihan</p>
            </div>

            {/* Description */}
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              {product.longDescription}
            </p>

            {/* Specs */}
            <div className="mt-5 space-y-3">
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Material</p>
                <p className="mt-1 text-sm text-gray-700">{product.material}</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Dimensi</p>
                <p className="mt-1 text-sm text-gray-700">{product.dimensions}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-green-600"
              >
                <MessageCircle className="size-5" />
                Pesan via WhatsApp
              </a>
              <Button
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={onClose}
              >
                Kembali ke Katalog
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ─────────────────── Full Products Catalog Page ─────────────────────────────── */

function ProductsCatalogPage({
  onNavigate,
  onBack,
}: {
  onNavigate: (view: ViewMode, href?: string) => void;
  onBack: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "popular">("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (activeCategory !== "Semua") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.priceMin - b.priceMin);
        break;
      case "price-desc":
        result.sort((a, b) => b.priceMin - a.priceMin);
        break;
      case "popular":
        result.sort((a, b) => b.sold - a.sold);
        break;
    }

    return result;
  }, [searchQuery, activeCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  // Reset page when filters change
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setActiveCategory(value);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((value: typeof sortBy) => {
    setSortBy(value);
    setCurrentPage(1);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-50 pt-20 pb-12"
    >
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="text-gray-500 hover:text-red-600"
              >
                <ArrowLeft className="size-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                  Katalog <span className="text-red-600">Produk</span>
                </h1>
                <p className="mt-0.5 text-sm text-gray-500">
                  {filteredProducts.length} produk ditemukan
                </p>
              </div>
            </div>
          </div>

          {/* Search & Sort */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Cari sofa, kategori, atau kata kunci..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="size-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as typeof sortBy)}
                className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-100"
              >
                <option value="default">Urutkan: Default</option>
                <option value="price-asc">Harga: Terendah</option>
                <option value="price-desc">Harga: Tertinggi</option>
                <option value="popular">Terpopuler</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        {paginatedProducts.length > 0 ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Card className="group h-full cursor-pointer overflow-hidden border-0 py-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <Badge className="absolute left-3 top-3 bg-red-600 text-white text-xs">
                        {product.category}
                      </Badge>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="flex items-center gap-1 text-xs text-white">
                          <Star className="size-3 fill-yellow-400 text-yellow-400" />
                          {product.rating}
                        </div>

                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-base font-bold text-gray-900 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-sm font-bold text-red-600">{product.price.split(" - ")[0]}</p>
                        {product.price.split(" - ")[1] && (
                          <span className="text-xs text-gray-400">s/d {product.price.split(" - ")[1]}</span>
                        )}
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                          }}
                          className="flex-1 rounded-md bg-red-600 py-2 text-xs font-semibold text-white transition-all hover:bg-red-700"
                        >
                          Lihat Detail
                        </button>
                        <a
                          href={`https://wa.me/6285198778338?text=${encodeURIComponent(`Halo Alfi Sofa, saya tertarik dengan ${product.name}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center justify-center rounded-md bg-red-500 px-3 py-2 text-white transition-all hover:bg-red-600"
                        >
                          <MessageCircle className="size-4" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(i + 1)}
                    className={
                      currentPage === i + 1
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600"
                    }
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-red-50">
              <Search className="size-8 text-red-300" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-900">Produk Tidak Ditemukan</h3>
            <p className="mt-1 text-sm text-gray-500">
              Coba ubah kata kunci pencarian atau pilih kategori lain
            </p>
            <Button
              variant="outline"
              className="mt-4 border-red-200 text-red-600 hover:bg-red-50"
              onClick={() => {
                handleSearchChange("");
                handleCategoryChange("Semua");
              }}
            >
              Reset Filter
            </Button>
          </div>
        )}
      </div>

      {/* Product Detail Dialog */}
      <ProductDetailDialog
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </motion.div>
  );
}

/* ──────────────────────────────── Features ─────────────────────────────────── */

function FeaturesSection() {
  return (
    <section id="keunggulan" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-600">
              Keunggulan
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Mengapa Memilih <span className="text-red-600">Alfi Sofa?</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-gray-500">
              Kami berkomitmen memberikan produk dan layanan terbaik untuk Anda
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 0.1}>
              <div className="group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-red-100 text-red-600 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white">
                  <feature.icon className="size-7" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────── Testimonials ─────────────────────────────── */

function TestimonialsSection() {
  return (
    <section id="testimoni" className="bg-red-600 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-semibold text-white">
              Testimoni
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Apa Kata Pelanggan Kami
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-red-100">
              Kepuasan pelanggan adalah prioritas utama kami
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.15}>
              <div className="rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="size-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                    {t.name.split(" ").map((w) => w[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.location}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────── Contact ──────────────────────────────────── */

function ContactSection() {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waMessage = encodeURIComponent(
      `Halo Alfi Sofa, saya ingin konsultasi.\n\nNama: ${formData.name}\nNo. HP: ${formData.phone}\n\nPesan:\n${formData.message}`
    );
    window.open(`https://wa.me/6285198778338?text=${waMessage}`, "_blank");
  };

  return (
    <section id="kontak" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-600">
              Kontak
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Hubungi <span className="text-red-600">Kami</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-gray-500">
              Konsultasikan kebutuhan sofa Anda dengan tim kami
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <FadeIn>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input
                      id="name"
                      placeholder="Masukkan nama Anda"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Contoh: 0851-9877-8338"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan</Label>
                    <Textarea
                      id="message"
                      placeholder="Tuliskan kebutuhan sofa Anda..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full gap-2 bg-green-500 py-3 text-base font-semibold text-white hover:bg-green-600"
                  >
                    <MessageCircle className="size-5" />
                    Kirim via WhatsApp
                  </Button>
                </form>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-6">
              <div className="rounded-2xl bg-red-600 p-8 text-white">
                <h3 className="text-xl font-bold">Informasi Kontak</h3>
                <p className="mt-2 text-sm text-red-100">
                  Hubungi kami melalui salah satu cara di bawah ini
                </p>
                <div className="mt-6 space-y-5">
                  {[
                    { icon: MapPin, label: "Alamat", value: "Jl. Warung Awi Cikadu, Cicangkang Hilir, Kec. Cipongkor, Kab. Bandung Barat, Jawa Barat 40562" },
                    { icon: Phone, label: "Telepon", value: "0851-9877-8338" },
                    { icon: MessageCircle, label: "WhatsApp", value: "0851-9877-8338" },
                    { icon: Clock, label: "Jam Operasional", value: "Senin - Sabtu, 08:00 - 17:00 WIB" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/20">
                        <item.icon className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{item.label}</p>
                        <p className="mt-0.5 text-sm text-red-100">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Google Maps */}
              <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-md">
                <iframe
                  src="https://maps.google.com/maps?q=ALFI+Sofa+Bandung+Jl+Warung+Awi+Cikadu+Cicangkang+Hilir+Cipongkor&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi ALFI SOFA Bandung"
                  className="w-full"
                />
                <div className="bg-white p-4">
                  <a
                    href="https://maps.app.goo.gl/SJZeexv5cqkjYpB17"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                  >
                    <MapPin className="size-4" />
                    Buka di Google Maps
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────── Footer ───────────────────────────────────── */

function Footer({ onNavigate }: { onNavigate: (view: ViewMode) => void }) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <h3 className="text-xl font-extrabold text-white">ALFI SOFA</h3>
            <p className="mt-1 text-xs text-red-400">BANDUNG</p>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Produsen sofa berkualitas premium di Bandung. Kualitas terbaik,
              harga terjangkau, dan pelayanan terpercaya.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Menu</h4>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => onNavigate(link.view, link.href)}
                    className="text-sm text-gray-400 transition-colors hover:text-red-400"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Kategori</h4>
            <ul className="mt-4 space-y-2">
              {CATEGORIES.filter((c) => c !== "Semua").map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => onNavigate("products")}
                    className="text-sm text-gray-400 transition-colors hover:text-red-400"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Kontak</h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="mt-0.5 size-4 shrink-0 text-red-500" />
                Jl. Warung Awi Cikadu, Cicangkang Hilir, Kec. Cipongkor, Kab. Bandung Barat
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="size-4 shrink-0 text-red-500" />
                0851-9877-8338
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="size-4 shrink-0 text-red-500" />
                Sen - Sab, 08:00 - 17:00
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Sosmed & Marketplace</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="https://www.instagram.com/alfisofa_bandung" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-red-400">
                  <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/profile.php?id=61566388113783" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-red-400">
                  <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://vt.tiktok.com/ZS98EPB7eVou4-vCxtO/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-red-400">
                  <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 4.76 1.52V6.8a4.84 4.84 0 0 1-1-.11z"/></svg>
                  TikTok Shop
                </a>
              </li>
              <li>
                <a href="https://youtube.com/@alfisofabandung" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-red-400">
                  <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                  YouTube
                </a>
              </li>
              <li>
                <a href="https://shopee.co.id/gudang_sofa_bandung" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-red-400">
                  <ShoppingBag className="size-4 shrink-0" />
                  Shopee
                </a>
              </li>

            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; 2024 Alfi Sofa Bandung. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────── Floating WhatsApp Button ────────────────────────── */

function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip */}
      <div
        className={`transition-all duration-300 ${showTooltip ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0 pointer-events-none"}`}
      >
        <div className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-lg border border-gray-100 max-w-[220px] whitespace-nowrap">
          Konsultasi &amp; Diskusi via WhatsApp 24/7
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 h-0 w-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-white"></div>
        </div>
      </div>
      {/* Button */}
      <a
        href="https://wa.me/6285198778338?text=Halo%20Alfi%20Sofa,%20saya%20ingin%20bertanya%20tentang%20sofa."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:bg-[#20BD5A]"
        aria-label="Chat WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Ping animation ring */}
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#25D366] opacity-30"></span>
        {/* Second ping ring (delayed) */}
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#25D366] opacity-20" style={{ animationDelay: "0.5s" }}></span>
        {/* WhatsApp Logo SVG */}
        <svg viewBox="0 0 32 32" className="relative size-7 drop-shadow-sm" fill="currentColor">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.744 3.054 9.378L1.056 31.2l6.062-1.95a15.9 15.9 0 0 0 8.886 2.692C24.826 31.942 32 24.766 32 16.004S24.826 0 16.004 0zm9.35 22.614c-.392 1.106-2.286 2.05-3.188 2.178-.822.116-1.86.166-3.002-.192a27.3 27.3 0 0 1-2.736-1.014c-4.816-2.086-7.968-6.964-8.212-7.296-.236-.334-1.936-2.578-1.936-4.918s1.226-3.486 1.66-3.964c.434-.478.95-.6 1.266-.6.316 0 .632.002.908.016.292.016.682-.11 1.066.814.392.942 1.332 3.252 1.45 3.488.116.236.196.514.04.828-.156.314-.236.508-.47.786-.236.278-.496.622-.708.834-.236.236-.482.492-.206.966.274.474 1.222 2.016 2.624 3.266 1.802 1.61 3.322 2.108 3.796 2.344.474.236.75.196 1.026-.118.278-.316 1.188-1.384 1.504-1.858.316-.474.632-.392 1.066-.236.434.156 2.748 1.296 3.222 1.532.474.236.79.354.908.55.118.196.118 1.136-.274 2.244z"/>
        </svg>
      </a>
    </div>
  );
}

/* ──────────────────────────────── Page ─────────────────────────────────────── */

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewMode>("home");

  const handleNavigate = (view: ViewMode, href?: string) => {
    setCurrentView(view);
    if (view === "home" && href) {
      // Small delay to ensure the view has switched before scrolling
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  };

  const handleBack = () => {
    setCurrentView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="overflow-x-hidden">
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      <AnimatePresence mode="wait">
        {currentView === "home" ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HeroSection onNavigate={handleNavigate} />
            <AboutSection />
            <FeaturedProductsPreview onNavigate={handleNavigate} />
            <FeaturesSection />
            <TestimonialsSection />
            <ContactSection />
          </motion.div>
        ) : (
          <motion.div
            key="products"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProductsCatalogPage onNavigate={handleNavigate} onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>

      {currentView === "home" && <Footer onNavigate={handleNavigate} />}
      <FloatingWhatsApp />
    </main>
  );
}
