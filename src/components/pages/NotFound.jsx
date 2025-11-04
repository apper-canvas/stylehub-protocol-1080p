import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* 404 Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
              <ApperIcon name="AlertTriangle" size={48} className="text-primary" />
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-secondary">404</h1>
            <h2 className="text-2xl font-semibold text-secondary">Page Not Found</h2>
            <p className="text-gray-600 leading-relaxed">
              Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="min-w-32"
            >
              <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
              Go Back
            </Button>
            
            <Button
              asChild
              className="min-w-32"
            >
              <Link to="/">
                <ApperIcon name="Home" size={16} className="mr-2" />
                Home Page
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Or try these popular pages:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/products" 
                className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
              >
                All Products
              </Link>
              <Link 
                to="/wishlist" 
                className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
              >
                Wishlist
              </Link>
              <Link 
                to="/cart" 
                className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
              >
                Shopping Cart
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default NotFound;