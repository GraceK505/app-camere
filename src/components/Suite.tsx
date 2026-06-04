"use client";

import React, { useState } from 'react';

// Types
export interface RoomSuite {
  id: string;
  name: string;
  type: 'standard' | 'superior' | 'deluxe' | 'suite' | 'presidential';
  maxAdults: number;
  maxChildren: number;
  pricePerNight: number;
  amenities: string[];
  imageUrl: string;
  description: string;
  sizeM2: number;
  bedType: string;
}

interface RoomSelectorProps {
  rooms: RoomSuite[];
  onSelect: (selectedRoom: RoomSuite | null) => void;
  defaultSelectedId?: string;
  className?: string;
  currency?: string;
  nights?: number; // pour afficher le prix total optionnel
}

const roomTypeLabels: Record<RoomSuite['type'], string> = {
  standard: 'Standard',
  superior: 'Supérieure',
  deluxe: 'Deluxe',
  suite: 'Suite',
  presidential: 'Présidentielle'
};

export const RoomSelector: React.FC<RoomSelectorProps> = ({
  rooms,
  onSelect,
  defaultSelectedId,
  className = '',
  currency = '€',
  nights = 1
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(defaultSelectedId || null);

  const handleSelect = (room: RoomSuite) => {
    const newSelectedId = selectedId === room.id ? null : room.id;
    setSelectedId(newSelectedId);
    const selectedRoom = newSelectedId ? rooms.find(r => r.id === newSelectedId) || null : null;
    onSelect(selectedRoom);
  };

  const formatPrice = (price: number) => {
    if (nights <= 1) return `${price} ${currency}`;
    return `${price * nights} ${currency} (${price} ${currency}/nuit)`;
  };

  return (
    <div className={`w-full max-w-6xl mx-auto p-4 ${className}`}>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Choisissez votre chambre ou suite</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => {
          const isSelected = selectedId === room.id;
          return (
            <div
              key={room.id}
              onClick={() => handleSelect(room)}
              className={`
                cursor-pointer rounded-xl overflow-hidden shadow-lg transition-all duration-300
                ${isSelected 
                  ? 'ring-4 ring-blue-500 scale-[1.02] shadow-xl' 
                  : 'hover:shadow-2xl hover:scale-[1.01]'
                }
              `}
            >
              <div className="relative h-48 bg-gray-200">
                <img
                  src={room.imageUrl}
                  alt={room.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Room+Image';
                  }}
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-sm font-semibold">
                  {roomTypeLabels[room.type]}
                </div>
                {isSelected && (
                  <div className="absolute top-3 right-3 bg-blue-600 text-white p-1 rounded-full">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="p-4 bg-white">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-800">{room.name}</h3>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-blue-600">{room.pricePerNight} {currency}</span>
                    <span className="text-gray-500 text-sm"> / nuit</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-600">
                  <span>🛏️ {room.bedType}</span>
                  <span>📏 {room.sizeM2} m²</span>
                  <span>👤 {room.maxAdults} adultes</span>
                  {room.maxChildren > 0 && <span>🧒 max {room.maxChildren} enfants</span>}
                </div>

                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{room.description}</p>

                <div className="flex flex-wrap gap-1 mt-3">
                  {room.amenities.slice(0, 3).map((amenity, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="text-xs text-gray-500">+{room.amenities.length - 3}</span>
                  )}
                </div>

                {nights > 1 && (
                  <div className="mt-3 pt-2 border-t text-sm text-gray-500">
                    Total séjour : <span className="font-semibold text-gray-800">{room.pricePerNight * nights} {currency}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};