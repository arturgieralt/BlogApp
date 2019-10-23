import bcrypt from 'bcrypt';
import multer from 'multer';
import axios from 'axios';
import fs from 'fs';

export type IEncryptor = typeof bcrypt;

export type IMulter = typeof multer;

export type IAxios = typeof axios;

export type IFileSystem = typeof fs;
