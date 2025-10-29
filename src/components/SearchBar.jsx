import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import './SearchBar.css'

const SearchBar = ({
  onSearch,
  onSuggestionSelect,
  suggestions = [],
  isLoading = false,
  placeholder,
  showSuggestions = true,
  debounceMs = 300,
  className = ''
}) => {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)
  const timeoutRef = useRef(null)

  // Debounced search
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      if (query.trim() && onSearch) {
        onSearch(query.trim())
      }
    }, debounceMs)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [query, onSearch, debounceMs])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)
    setSelectedIndex(-1)
    
    // Trigger search immediately when input is cleared
    if (value === '' && query !== '') {
      onSearch?.('')
    }
    
    if (value.trim() && showSuggestions && suggestions.length > 0) {
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }
  }

  const handleKeyDown = (e) => {
    if (!showDropdown || suggestions.length === 0) {
      if (e.key === 'Enter' && query.trim()) {
        e.preventDefault()
        onSearch?.(query.trim())
        setShowDropdown(false)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex])
        } else if (query.trim()) {
          onSearch?.(query.trim())
          setShowDropdown(false)
        }
        break
      case 'Escape':
        setShowDropdown(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title || suggestion.name || suggestion)
    setShowDropdown(false)
    setSelectedIndex(-1)
    onSuggestionSelect?.(suggestion)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch?.(query.trim())
      setShowDropdown(false)
    }
  }

  const clearSearch = () => {
    setQuery('')
    setShowDropdown(false)
    setSelectedIndex(-1)
    onSearch?.('') // Trigger search with empty query
    inputRef.current?.focus()
  }

  return (
    <div className={`search-bar ${className}`}>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (query.trim() && showSuggestions && suggestions.length > 0) {
                setShowDropdown(true)
              }
            }}
            placeholder={placeholder || t('search.placeholder')}
            className="search-input"
            autoComplete="off"
          />
          
          <div className="search-actions">
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="clear-search-btn"
                aria-label={t('search.clear')}
              >
                ✕
              </button>
            )}
            
            <button
              type="submit"
              className="search-submit-btn"
              disabled={isLoading}
              aria-label={t('search.submit')}
            >
              {isLoading ? (
                <div className="search-spinner">⚪</div>
              ) : (
                <span className="search-icon">🔍</span>
              )}
            </button>
          </div>
        </div>

        {/* Suggestions dropdown */}
        {showDropdown && showSuggestions && suggestions.length > 0 && (
          <div ref={dropdownRef} className="search-suggestions">
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion.id || suggestion.handle || index}
                className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="suggestion-content">
                  <span className="suggestion-title">
                    {suggestion.title || suggestion.name || suggestion}
                  </span>
                  {suggestion.price && (
                    <span className="suggestion-price">
                      {suggestion.formattedPrice || suggestion.price}
                    </span>
                  )}
                </div>
                {suggestion.productType && (
                  <span className="suggestion-type">
                    {suggestion.productType}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  )
}

export default SearchBar