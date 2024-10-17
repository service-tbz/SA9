"use client";

import { useState } from 'react';
import { MapPin, Plane, Users, ChevronDown, Edit3, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type HeaderProps = {
  userType: 'municipality' | 'operator' | 'resident';
  setUserType: (type: 'municipality' | 'operator' | 'resident') => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
};

export default function Header({ userType, setUserType, isEditing, setIsEditing }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getUserIcon = () => {
    switch (userType) {
      case 'municipality':
        return <MapPin className="mr-2 h-4 w-4" />;
      case 'operator':
        return <Plane className="mr-2 h-4 w-4" />;
      case 'resident':
        return <Users className="mr-2 h-4 w-4" />;
    }
  };

  const getUserTypeText = () => {
    return userType.charAt(0).toUpperCase() + userType.slice(1);
  };

  const getActionText = () => {
    switch (userType) {
      case 'municipality':
        return 'Set No-Fly Zone';
      case 'operator':
        return 'Set Flight Path';
      case 'resident':
        return 'Report Issue';
      default:
        return '';
    }
  };

  return (
    <header className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">SkyArea9</h1>
        <div className="flex items-center space-x-4">
          <span className="font-semibold">{getActionText()}</span>
          {!isEditing ? (
            <Button variant="secondary" onClick={() => setIsEditing(true)}>
              <Edit3 className="mr-2 h-4 w-4" />
              Edit
            </Button>
          ) : (
            <>
              <Button variant="destructive" onClick={() => setIsEditing(false)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            </>
          )}
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-40 text-black">
                {getUserIcon()}
                {getUserTypeText()}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuItem onClick={() => setUserType('municipality')}>
                <MapPin className="mr-2 h-4 w-4" />
                Municipality
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUserType('operator')}>
                <Plane className="mr-2 h-4 w-4" />
                Operator
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUserType('resident')}>
                <Users className="mr-2 h-4 w-4" />
                Resident
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}