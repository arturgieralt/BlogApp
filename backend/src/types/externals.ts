import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import multer from 'multer';
import axios from 'axios';
import fs from 'fs';

export type IEncryptor = typeof bcrypt;

export type IJWT = typeof jwt;

export type IMulter = typeof multer;

export type IAxios = typeof axios;

export type IFileSystem = typeof fs;
