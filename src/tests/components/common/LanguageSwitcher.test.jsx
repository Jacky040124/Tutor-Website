import React from 'react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import '@testing-library/jest-dom';

// Mock the react-i18next hook
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'en',
      changeLanguage: vi.fn()
    }
  })
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders language buttons', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('中文')).toBeInTheDocument();
  });

  test('handles language change correctly', () => {
    render(<LanguageSwitcher />);
    const zhButton = screen.getByText('中文');
    
    fireEvent.click(zhButton);
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith("i18nextLng", "zh");
  });
}); 