---
title: Training a ResNet-like network from scratch
date: "2019-06-22"
description: Training a modified ResNet network on the TinyImageNet dataset.

---

This was done mainly as a learning exercise - to learn how to train neural networks from scratch, and also the patience required to do so.

The dataset used is [Tiny ImageNet](https://tiny-imagenet.herokuapp.com/) - a modified version of the original ImageNet dataset. It has 200 classes, each class having 500 training images, 50 validation and 50 test images. Since the labels for the test set is not available publically, the validation set is used as the test set here.
The images are 64x64 resized versions of the original ImageNet images.

Final model is a modified version of the Resnet architecture. Few changes were made on the original architecture - 

1. No. of layers in the network was changed to fit the receptive field of the image size.
2. Instead of using `add` to merge the layers, I used `concatenate`, inspired by WideResNet and DesneNet architectures - this allows us to retain more of the information. 1x1 layer was then used to reduce the size of the concatenated layer.
3. All fully connected layers were removed, GlobalAveragePooling was added. This allowed the network to take different sized images as input, which allowed progressive resizing of images while training.
4. The number of kernels in each layer is also changed based on what gave the most accuracy while training.

The training was done on Google Colab, so certain architectural decisions, like number of kernels in each layer, was also taken to avoid the epochs getting too slow, and to avoid OOM errors.

To prevent overfitting, image augmentation was used. Images were randomly augmented horizontal flips, cropping and padding, scale, translate, rotate, and shear.

Further augmentation was done while training - training was done in batches of epochs, for the initial set images were randomly cropped to (32,32) then (48,48), before training on the full sized (64, 64) images. This added more regularization, and also made the training faster for the initial epochs.

The idea was taken from [fast.ai's approach](https://www.fast.ai/2018/08/10/fastai-diu-imagenet/) where they used progressive resizing to train the network faster.

Another lesson learned from fast.ai's videos - used One Cycle Policy of Cyclic Learning Rate to train the network. This increases the learning rate for certain duration while training, then decreases it, and trains at a very low learning rate for the final epochs in training. This prevents the model from getting stuck at a local minima, forcing it to explore more, and also allows us to train longer.

The final model has 12.9M parameters, and achieved a validation accuracy of 60%. Training was stopped after this.

Further improvements that could be done - 

1. Instead of ResNet, DenseNet like network might give more accuracy, since it holds more of the image context.
2. Better image augmentation can be done for difficult classes, techniques like negative hard mining can be done to make the network train better on tough classes.
3. Parameters of Cyclic Learning Rate can be tuned better.

*Summary of the model is added below.*

[Code can be found here.](https://github.com/unography/tinyimagenet-resnet)

```
Layer (type)                    Output Shape         Param #     Connected to                     
==================================================================================================
input_1 (InputLayer)            (None, 64, 64, 3)    0                                            
__________________________________________________________________________________________________
conv2d_1 (Conv2D)               (None, 64, 64, 128)  3456        input_1[0][0]                    
__________________________________________________________________________________________________
batch_normalization_1 (BatchNor (None, 64, 64, 128)  512         conv2d_1[0][0]                   
__________________________________________________________________________________________________
activation_1 (Activation)       (None, 64, 64, 128)  0           batch_normalization_1[0][0]      
__________________________________________________________________________________________________
conv2d_2 (Conv2D)               (None, 64, 64, 128)  147456      activation_1[0][0]               
__________________________________________________________________________________________________
batch_normalization_2 (BatchNor (None, 64, 64, 128)  512         conv2d_2[0][0]                   
__________________________________________________________________________________________________
activation_2 (Activation)       (None, 64, 64, 128)  0           batch_normalization_2[0][0]      
__________________________________________________________________________________________________
conv2d_3 (Conv2D)               (None, 64, 64, 128)  147456      activation_2[0][0]               
__________________________________________________________________________________________________
batch_normalization_3 (BatchNor (None, 64, 64, 128)  512         conv2d_3[0][0]                   
__________________________________________________________________________________________________
activation_3 (Activation)       (None, 64, 64, 128)  0           batch_normalization_3[0][0]      
__________________________________________________________________________________________________
conv2d_4 (Conv2D)               (None, 64, 64, 128)  147456      activation_3[0][0]               
__________________________________________________________________________________________________
batch_normalization_4 (BatchNor (None, 64, 64, 128)  512         conv2d_4[0][0]                   
__________________________________________________________________________________________________
activation_4 (Activation)       (None, 64, 64, 128)  0           batch_normalization_4[0][0]      
__________________________________________________________________________________________________
conv2d_5 (Conv2D)               (None, 64, 64, 128)  147456      activation_4[0][0]               
__________________________________________________________________________________________________
batch_normalization_5 (BatchNor (None, 64, 64, 128)  512         conv2d_5[0][0]                   
__________________________________________________________________________________________________
activation_5 (Activation)       (None, 64, 64, 128)  0           batch_normalization_5[0][0]      
__________________________________________________________________________________________________
conv2d_6 (Conv2D)               (None, 64, 64, 128)  147456      activation_5[0][0]               
__________________________________________________________________________________________________
batch_normalization_6 (BatchNor (None, 64, 64, 128)  512         conv2d_6[0][0]                   
__________________________________________________________________________________________________
activation_6 (Activation)       (None, 64, 64, 128)  0           batch_normalization_6[0][0]      
__________________________________________________________________________________________________
conv2d_7 (Conv2D)               (None, 64, 64, 128)  147456      activation_6[0][0]               
__________________________________________________________________________________________________
concatenate_1 (Concatenate)     (None, 64, 64, 256)  0           conv2d_7[0][0]                   
                                                                 activation_3[0][0]               
__________________________________________________________________________________________________
max_pooling2d_1 (MaxPooling2D)  (None, 32, 32, 256)  0           concatenate_1[0][0]              
__________________________________________________________________________________________________
batch_normalization_7 (BatchNor (None, 32, 32, 256)  1024        max_pooling2d_1[0][0]            
__________________________________________________________________________________________________
activation_7 (Activation)       (None, 32, 32, 256)  0           batch_normalization_7[0][0]      
__________________________________________________________________________________________________
conv2d_8 (Conv2D)               (None, 32, 32, 256)  589824      activation_7[0][0]               
__________________________________________________________________________________________________
batch_normalization_8 (BatchNor (None, 32, 32, 256)  1024        conv2d_8[0][0]                   
__________________________________________________________________________________________________
activation_8 (Activation)       (None, 32, 32, 256)  0           batch_normalization_8[0][0]      
__________________________________________________________________________________________________
conv2d_9 (Conv2D)               (None, 32, 32, 256)  589824      activation_8[0][0]               
__________________________________________________________________________________________________
batch_normalization_9 (BatchNor (None, 32, 32, 256)  1024        conv2d_9[0][0]                   
__________________________________________________________________________________________________
activation_9 (Activation)       (None, 32, 32, 256)  0           batch_normalization_9[0][0]      
__________________________________________________________________________________________________
conv2d_10 (Conv2D)              (None, 32, 32, 256)  589824      activation_9[0][0]               
__________________________________________________________________________________________________
batch_normalization_10 (BatchNo (None, 32, 32, 256)  1024        conv2d_10[0][0]                  
__________________________________________________________________________________________________
activation_10 (Activation)      (None, 32, 32, 256)  0           batch_normalization_10[0][0]     
__________________________________________________________________________________________________
conv2d_11 (Conv2D)              (None, 32, 32, 256)  589824      activation_10[0][0]              
__________________________________________________________________________________________________
concatenate_2 (Concatenate)     (None, 32, 32, 512)  0           conv2d_11[0][0]                  
                                                                 max_pooling2d_1[0][0]            
__________________________________________________________________________________________________
max_pooling2d_2 (MaxPooling2D)  (None, 16, 16, 512)  0           concatenate_2[0][0]              
__________________________________________________________________________________________________
batch_normalization_11 (BatchNo (None, 16, 16, 512)  2048        max_pooling2d_2[0][0]            
__________________________________________________________________________________________________
activation_11 (Activation)      (None, 16, 16, 512)  0           batch_normalization_11[0][0]     
__________________________________________________________________________________________________
conv2d_12 (Conv2D)              (None, 16, 16, 512)  2359296     activation_11[0][0]              
__________________________________________________________________________________________________
batch_normalization_12 (BatchNo (None, 16, 16, 512)  2048        conv2d_12[0][0]                  
__________________________________________________________________________________________________
activation_12 (Activation)      (None, 16, 16, 512)  0           batch_normalization_12[0][0]     
__________________________________________________________________________________________________
conv2d_13 (Conv2D)              (None, 16, 16, 512)  2359296     activation_12[0][0]              
__________________________________________________________________________________________________
batch_normalization_13 (BatchNo (None, 16, 16, 512)  2048        conv2d_13[0][0]                  
__________________________________________________________________________________________________
activation_13 (Activation)      (None, 16, 16, 512)  0           batch_normalization_13[0][0]     
__________________________________________________________________________________________________
conv2d_14 (Conv2D)              (None, 16, 16, 512)  2359296     activation_13[0][0]              
__________________________________________________________________________________________________
batch_normalization_14 (BatchNo (None, 16, 16, 512)  2048        conv2d_14[0][0]                  
__________________________________________________________________________________________________
activation_14 (Activation)      (None, 16, 16, 512)  0           batch_normalization_14[0][0]     
__________________________________________________________________________________________________
conv2d_15 (Conv2D)              (None, 16, 16, 512)  2359296     activation_14[0][0]              
__________________________________________________________________________________________________
concatenate_3 (Concatenate)     (None, 16, 16, 1024) 0           conv2d_15[0][0]                  
                                                                 max_pooling2d_2[0][0]            
__________________________________________________________________________________________________
batch_normalization_15 (BatchNo (None, 16, 16, 1024) 4096        concatenate_3[0][0]              
__________________________________________________________________________________________________
activation_15 (Activation)      (None, 16, 16, 1024) 0           batch_normalization_15[0][0]     
__________________________________________________________________________________________________
conv2d_16 (Conv2D)              (None, 16, 16, 200)  204800      activation_15[0][0]              
__________________________________________________________________________________________________
global_average_pooling2d_1 (Glo (None, 200)          0           conv2d_16[0][0]                  
==================================================================================================
Total params: 12,908,928
Trainable params: 12,899,200
Non-trainable params: 9,728
_____________________________
```

