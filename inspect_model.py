import h5py
import numpy as np

def inspect_weights(weights_path):
    print(f"Inspecting weights file: {weights_path}")
    
    with h5py.File(weights_path, 'r') as f:
        def print_structure(name, obj):
            if isinstance(obj, h5py.Dataset):
                print(f"Dataset: {name}, Shape: {obj.shape}, Type: {obj.dtype}")
            elif isinstance(obj, h5py.Group):
                print(f"Group: {name}")
        
        print("\n=== Model Structure ===")
        f.visititems(print_structure)
        
        # Try to extract layer information
        print("\n=== Layer Analysis ===")
        if 'model_weights' in f:
            model_weights = f['model_weights']
            for layer_name in model_weights.keys():
                layer = model_weights[layer_name]
                print(f"\nLayer: {layer_name}")
                for weight_name in layer.keys():
                    weight = layer[weight_name]
                    print(f"  {weight_name}: {weight.shape}")

if __name__ == "__main__":
    inspect_weights("trained model/modelcheck.weights.h5")
